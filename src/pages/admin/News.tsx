import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faEye, 
  faCalendar,
  faTag,
  faNewspaper,
  faSave,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { news, NewsItem } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const AdminNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(news);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    coverImage: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      coverImage: ''
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setFormData(prev => ({ ...prev, coverImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: imagePreview || undefined,
        publishedAt: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      setNewsItems(prev => [newItem, ...prev]);
      resetForm();
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "News article created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create news article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      tags: item.tags.join(', '),
      coverImage: item.coverImage || ''
    });
    setImagePreview(item.coverImage || '');
    setImageFile(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    
    setIsLoading(true);
    try {
      const updatedItem: NewsItem = {
        ...editingItem,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: imagePreview || undefined,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      setNewsItems(prev => prev.map(item => 
        item.id === editingItem.id ? updatedItem : item
      ));
      
      resetForm();
      setEditingItem(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "News article updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update news article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;
    
    try {
      setNewsItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "News article deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete news article. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">News Management</h1>
          <p className="text-muted-foreground">Create and manage news articles for the TECA website</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New News Article</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new news article.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter article title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the article"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article content"
                  rows={8}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Enter tags separated by commas (e.g., resettlement, community, infrastructure)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={isLoading || !formData.title || !formData.excerpt || !formData.content}>
                  <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                  {isLoading ? 'Creating...' : 'Create Article'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* News Articles List */}
      <div className="grid gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="shadow-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl font-serif">{item.title}</CardTitle>
                  <CardDescription className="mt-2">{item.excerpt}</CardDescription>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(item)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-1" />
                  {new Date(item.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faTag} className="h-4 w-4 mr-1" />
                  {item.tags.length} tags
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faNewspaper} className="h-4 w-4 mr-1" />
                  {item.content.length} characters
                </div>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
            <DialogDescription>
              Update the details of this news article.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter article title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-excerpt">Excerpt *</Label>
              <Textarea
                id="edit-excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the article"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content *</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Full article content"
                rows={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-coverImage">Cover Image</Label>
              <Input
                id="edit-coverImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-32 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={isLoading || !formData.title || !formData.excerpt || !formData.content}>
                <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                {isLoading ? 'Updating...' : 'Update Article'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNews;
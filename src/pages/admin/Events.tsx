import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faCalendar,
  faMapMarkerAlt,
  faUsers,
  faSave,
  faClock,
  faEye
} from "@fortawesome/free-solid-svg-icons";
import { events, Event } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const AdminEvents = () => {
  const [eventData, setEventData] = useState<Event[]>(events);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    coverImage: '',
    rsvpEnabled: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      coverImage: '',
      rsvpEnabled: false
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        location: formData.location,
        coverImage: formData.coverImage || undefined,
        rsvpEnabled: formData.rsvpEnabled
      };

      setEventData(prev => [newEvent, ...prev]);
      resetForm();
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Event created successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate || '',
      location: event.location,
      coverImage: event.coverImage || '',
      rsvpEnabled: event.rsvpEnabled
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingEvent) return;
    
    setIsLoading(true);
    try {
      const updatedEvent: Event = {
        ...editingEvent,
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate || undefined,
        location: formData.location,
        coverImage: formData.coverImage || undefined,
        rsvpEnabled: formData.rsvpEnabled
      };

      setEventData(prev => prev.map(event => 
        event.id === editingEvent.id ? updatedEvent : event
      ));
      
      resetForm();
      setEditingEvent(null);
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "Event updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      setEventData(prev => prev.filter(event => event.id !== id));
      toast({
        title: "Success",
        description: "Event deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isUpcoming = (date: string) => {
    return new Date(date) > new Date();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Event Management</h1>
          <p className="text-muted-foreground">Create and manage upcoming events for the TECA community</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new event.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the event"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date & Time *</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date & Time</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter event location"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="rsvpEnabled"
                  checked={formData.rsvpEnabled}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rsvpEnabled: checked }))}
                />
                <Label htmlFor="rsvpEnabled">Enable RSVP</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={isLoading || !formData.title || !formData.description || !formData.startDate || !formData.location}>
                  <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                  {isLoading ? 'Creating...' : 'Create Event'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events List */}
      <div className="grid gap-6">
        {eventData.map((event) => {
          const upcoming = isUpcoming(event.startDate);
          return (
            <Card key={event.id} className="shadow-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl font-serif">{event.title}</CardTitle>
                      <Badge variant={upcoming ? "default" : "secondary"}>
                        {upcoming ? "Upcoming" : "Past"}
                      </Badge>
                      {event.rsvpEnabled && (
                        <Badge variant="outline">
                          <FontAwesomeIcon icon={faUsers} className="h-3 w-3 mr-1" />
                          RSVP
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2">{event.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(event)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{formatDate(event.startDate)}</div>
                        <div className="text-muted-foreground">{formatTime(event.startDate)}</div>
                      </div>
                    </div>
                    
                    {event.endDate && (
                      <div className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faClock} className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Ends: {formatDate(event.endDate)}</div>
                          <div className="text-muted-foreground">{formatTime(event.endDate)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the details of this event.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Event Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the event"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Start Date & Time *</Label>
                <Input
                  id="edit-startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-endDate">End Date & Time</Label>
                <Input
                  id="edit-endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location *</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter event location"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-coverImage">Cover Image URL</Label>
              <Input
                id="edit-coverImage"
                value={formData.coverImage}
                onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-rsvpEnabled"
                checked={formData.rsvpEnabled}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, rsvpEnabled: checked }))}
              />
              <Label htmlFor="edit-rsvpEnabled">Enable RSVP</Label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={isLoading || !formData.title || !formData.description || !formData.startDate || !formData.location}>
                <FontAwesomeIcon icon={faSave} className="h-4 w-4 mr-2" />
                {isLoading ? 'Updating...' : 'Update Event'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEvents;
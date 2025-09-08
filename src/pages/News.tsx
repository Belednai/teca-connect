import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";
import { news } from "@/lib/data";

const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(news.flatMap(item => item.tags)));

  // Filter news based on search and tag
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || item.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <Layout
      title="News & Updates"
      description="Stay informed about TECA's activities, progress, and community developments"
    >
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search news and updates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Tag filters */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Filter by topic:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedTag === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag(null)}
                    >
                      All News
                    </Button>
                    {allTags.map((tag) => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* News Grid */}
          <div className="max-w-6xl mx-auto">
            {filteredNews.length === 0 ? (
              <Card className="shadow-card text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground text-lg">
                    No news found matching your search criteria.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((item) => (
                  <Card key={item.id} className="group shadow-card hover:shadow-elegant transition-smooth">
                    <div className="aspect-video bg-primary/5 rounded-t-lg relative overflow-hidden">
                      <img 
                        src="/img/twicconf.jpg" 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <CardTitle className="font-serif text-xl group-hover:text-primary transition-smooth">
                        <Link to={`/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </CardTitle>
                      
                      <CardDescription className="line-clamp-3 leading-relaxed">
                        {item.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Read more button */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <Link to={`/news/${item.slug}`}>
                            Read Full Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-2xl mx-auto mt-16">
            <Card className="shadow-card bg-primary/5">
              <CardHeader className="text-center">
                <CardTitle className="font-serif text-2xl text-primary">
                  Stay Updated
                </CardTitle>
                <CardDescription>
                  Subscribe to receive the latest news and updates from TECA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Your email address"
                    type="email"
                    className="flex-1"
                  />
                  <Button className="sm:w-auto">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  We respect your privacy and will never share your email address.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
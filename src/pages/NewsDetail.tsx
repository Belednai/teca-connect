import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { Calendar, ArrowLeft, Share2, User } from "lucide-react";
import { news } from "@/lib/data";

const NewsDetail = () => {
  const { slug } = useParams();
  const article = news.find(item => item.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Card className="shadow-card max-w-2xl mx-auto">
              <CardContent className="pt-8">
                <h1 className="text-2xl font-serif font-bold text-primary mb-4">
                  Article Not Found
                </h1>
                <p className="text-muted-foreground mb-6">
                  The news article you're looking for doesn't exist or has been moved.
                </p>
                <Button asChild>
                  <Link to="/news">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to News
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="max-w-4xl mx-auto mb-8">
            <Button variant="ghost" asChild>
              <Link to="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>
          </div>

          {/* Article */}
          <article className="max-w-4xl mx-auto">
            <Card className="shadow-card">
              {/* Header image */}
              <div className="aspect-video bg-gradient-primary rounded-t-lg relative overflow-hidden">
                <img 
                  src="/img/twicconf.jpg" 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="space-y-6">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    TECA Communications
                  </div>
                </div>

                {/* Title */}
                <CardTitle className="font-serif text-3xl md:text-4xl text-primary">
                  {article.title}
                </CardTitle>

                {/* Excerpt */}
                <CardDescription className="text-lg leading-relaxed">
                  {article.excerpt}
                </CardDescription>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Article content */}
                <div className="prose prose-lg max-w-none">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share */}
                <div className="border-t pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif font-semibold text-lg text-primary mb-2">
                        Share this article
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Help spread the word about TECA's work and progress
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Related Articles */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-serif font-bold text-primary mb-8">
              Related Articles
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {news
                .filter(item => item.id !== article.id)
                .slice(0, 2)
                .map((item) => (
                  <Card key={item.id} className="group shadow-card hover:shadow-elegant transition-smooth">
                    <CardHeader>
                      <CardTitle className="font-serif text-lg group-hover:text-primary transition-smooth">
                        <Link to={`/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/news/${item.slug}`}>
                            Read More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
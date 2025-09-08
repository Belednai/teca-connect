import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faNewspaper, faCalendarDays, faUserTie, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";
import { news, events, leaders, payams } from "@/lib/data";

interface SearchResult {
  id: string;
  title: string;
  type: 'news' | 'event' | 'leader' | 'payam';
  slug?: string;
  excerpt?: string;
  description?: string;
  bio?: string;
  tags?: string[];
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when search bar opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search functionality
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate search delay
    const timeoutId = setTimeout(() => {
      const searchResults: SearchResult[] = [];
      const searchTerm = query.toLowerCase();

      // Search news
      news.forEach(item => {
        if (
          item.title.toLowerCase().includes(searchTerm) ||
          item.excerpt.toLowerCase().includes(searchTerm) ||
          item.content.toLowerCase().includes(searchTerm) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        ) {
          searchResults.push({
            id: item.id,
            title: item.title,
            type: 'news',
            slug: item.slug,
            excerpt: item.excerpt,
            tags: item.tags
          });
        }
      });

      // Search events
      events.forEach(event => {
        if (
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm)
        ) {
          searchResults.push({
            id: event.id,
            title: event.title,
            type: 'event',
            slug: event.slug,
            description: event.description
          });
        }
      });

      // Search leaders
      leaders.forEach(leader => {
        if (
          leader.name.toLowerCase().includes(searchTerm) ||
          leader.title.toLowerCase().includes(searchTerm) ||
          leader.bio.toLowerCase().includes(searchTerm)
        ) {
          searchResults.push({
            id: leader.id,
            title: leader.name,
            type: 'leader',
            description: leader.title,
            bio: leader.bio
          });
        }
      });

      // Search payams
      payams.forEach(payam => {
        if (
          payam.name.toLowerCase().includes(searchTerm) ||
          payam.description.toLowerCase().includes(searchTerm)
        ) {
          searchResults.push({
            id: payam.id,
            title: payam.name,
            type: 'payam',
            slug: payam.slug,
            description: payam.description
          });
        }
      });

      setResults(searchResults.slice(0, 8)); // Limit to 8 results
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'news':
        return faNewspaper;
      case 'event':
        return faCalendarDays;
      case 'leader':
        return faUserTie;
      case 'payam':
        return faHandHoldingHeart;
      default:
        return faSearch;
    }
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'news':
        return `/news/${result.slug}`;
      case 'event':
        return `/events/${result.slug}`;
      case 'leader':
        return '/leadership';
      case 'payam':
        return `/resettlement/payams/${result.slug}`;
      default:
        return '/';
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      {/* Search Button */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
      </Button>

      {/* Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={handleClose}>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4">
            <Card className="shadow-2xl border-0">
              <CardContent className="p-0">
                {/* Search Input */}
                <div className="flex items-center p-4 border-b">
                  <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-muted-foreground mr-3" />
                  <Input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search news, events, leaders, payams..."
                    className="border-0 text-lg focus-visible:ring-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="ml-2"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                  </Button>
                </div>

                {/* Search Results */}
                {query.length >= 2 && (
                  <div className="max-h-96 overflow-y-auto">
                    {isLoading ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <FontAwesomeIcon icon={faSearch} className="h-6 w-6 animate-spin mb-2" />
                        <p>Searching...</p>
                      </div>
                    ) : results.length > 0 ? (
                      <div className="p-2">
                        {results.map((result) => (
                          <Link
                            key={`${result.type}-${result.id}`}
                            to={getResultLink(result)}
                            onClick={handleClose}
                            className="block p-3 hover:bg-accent rounded-md transition-colors"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-1">
                                <FontAwesomeIcon 
                                  icon={getResultIcon(result.type)} 
                                  className="h-4 w-4 text-primary" 
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-sm truncate">
                                    {result.title}
                                  </h4>
                                  <Badge variant="secondary" className="text-xs">
                                    {result.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {result.excerpt || result.description || result.bio}
                                </p>
                                {result.tags && result.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {result.tags.slice(0, 3).map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <FontAwesomeIcon icon={faSearch} className="h-8 w-8 mb-2 opacity-50" />
                        <p>No results found for "{query}"</p>
                        <p className="text-xs mt-1">Try searching for news, events, leaders, or payams</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Search Tips */}
                {query.length < 2 && (
                  <div className="p-6 text-center text-muted-foreground">
                    <FontAwesomeIcon icon={faSearch} className="h-8 w-8 mb-2 opacity-50" />
                    <p className="font-medium mb-2">Search TECA</p>
                    <p className="text-sm">Find news articles, events, leaders, and payam information</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      <Badge variant="outline" className="text-xs">news</Badge>
                      <Badge variant="outline" className="text-xs">events</Badge>
                      <Badge variant="outline" className="text-xs">leadership</Badge>
                      <Badge variant="outline" className="text-xs">payams</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;

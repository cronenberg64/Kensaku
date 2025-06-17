import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  Users,
  Hash,
  BookOpen,
  Eye,
  Download,
  ExternalLink
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePaperStore } from 'utils/paperStore';
import { PaperData } from 'utils/firestore';
import { EmptyState } from 'components/EmptyState';
import { useDebounce } from 'utils/useDebounce';

type SortOption = 'relevance' | 'date' | 'author';
type SortDirection = 'asc' | 'desc';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { searchPapers } = usePaperStore();
  
  // Search state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<PaperData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Filter state
  const [authorFilter, setAuthorFilter] = useState(searchParams.get('author') || '');
  const [keywordFilter, setKeywordFilter] = useState(searchParams.get('keywords') || '');
  const [yearFilter, setYearFilter] = useState(searchParams.get('year') || '');
  
  // Sort state
  const [sortBy, setSortBy] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'relevance');
  const [sortDirection, setSortDirection] = useState<SortDirection>((searchParams.get('order') as SortDirection) || 'desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  
  // Debounced search
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedAuthorFilter = useDebounce(authorFilter, 300);
  const debouncedKeywordFilter = useDebounce(keywordFilter, 300);
  
  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set('q', debouncedSearchTerm);
    if (debouncedAuthorFilter) params.set('author', debouncedAuthorFilter);
    if (debouncedKeywordFilter) params.set('keywords', debouncedKeywordFilter);
    if (yearFilter) params.set('year', yearFilter);
    if (sortBy !== 'relevance') params.set('sort', sortBy);
    if (sortDirection !== 'desc') params.set('order', sortDirection);
    
    setSearchParams(params);
  }, [debouncedSearchTerm, debouncedAuthorFilter, debouncedKeywordFilter, yearFilter, sortBy, sortDirection, setSearchParams]);
  
  // Perform search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchTerm && !debouncedAuthorFilter && !debouncedKeywordFilter) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      
      setIsLoading(true);
      setHasSearched(true);
      
      try {
        const searchResults = await searchPapers(debouncedSearchTerm);
        let filteredResults = searchResults;
        
        // Apply filters
        if (debouncedAuthorFilter) {
          filteredResults = filteredResults.filter(paper =>
            paper.authors.some(author => 
              author.toLowerCase().includes(debouncedAuthorFilter.toLowerCase())
            )
          );
        }
        
        if (debouncedKeywordFilter) {
          filteredResults = filteredResults.filter(paper =>
            paper.keywords.some(keyword => 
              keyword.toLowerCase().includes(debouncedKeywordFilter.toLowerCase())
            )
          );
        }
        
        if (yearFilter) {
          filteredResults = filteredResults.filter(paper => {
            const paperYear = paper.publishedAt?.getFullYear() || paper.createdAt?.getFullYear();
            return paperYear === parseInt(yearFilter);
          });
        }
        
        // Apply sorting
        filteredResults = sortResults(filteredResults, sortBy, sortDirection);
        
        setResults(filteredResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [debouncedSearchTerm, debouncedAuthorFilter, debouncedKeywordFilter, yearFilter, sortBy, sortDirection, searchPapers]);
  
  const sortResults = (papers: PaperData[], sort: SortOption, direction: SortDirection) => {
    const sorted = [...papers].sort((a, b) => {
      let comparison = 0;
      
      switch (sort) {
        case 'date':
          const aDate = a.publishedAt || a.createdAt || new Date(0);
          const bDate = b.publishedAt || b.createdAt || new Date(0);
          comparison = aDate.getTime() - bDate.getTime();
          break;
        case 'author':
          comparison = a.authors[0]?.localeCompare(b.authors[0] || '') || 0;
          break;
        case 'relevance':
        default:
          // For relevance, we could implement a scoring system
          // For now, just sort by published date
          const aRel = a.publishedAt || a.createdAt || new Date(0);
          const bRel = b.publishedAt || b.createdAt || new Date(0);
          comparison = bRel.getTime() - aRel.getTime();
          break;
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  };
  
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark key={index} className="bg-cyan-400/20 text-cyan-300 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Unknown date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };
  
  // Pagination
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return results.slice(startIndex, startIndex + resultsPerPage);
  }, [results, currentPage, resultsPerPage]);
  
  const totalPages = Math.ceil(results.length / resultsPerPage);
  
  const clearFilters = () => {
    setSearchTerm('');
    setAuthorFilter('');
    setKeywordFilter('');
    setYearFilter('');
    setSortBy('relevance');
    setSortDirection('desc');
    setCurrentPage(1);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Academic Search</h1>
              <p className="text-slate-300">Discover research papers from the academic community</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/Dashboard')}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              My Dashboard
            </Button>
          </div>
          
          {/* Main Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search papers, authors, topics..."
              className="pl-12 h-14 text-lg bg-slate-800/50 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>
          
          {/* Filters and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div>
              <Input
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                placeholder="Filter by author"
                className="bg-slate-800/50 border-slate-700 focus:border-cyan-400"
              />
            </div>
            <div>
              <Input
                value={keywordFilter}
                onChange={(e) => setKeywordFilter(e.target.value)}
                placeholder="Filter by keywords"
                className="bg-slate-800/50 border-slate-700 focus:border-cyan-400"
              />
            </div>
            <div>
              <Input
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                placeholder="Filter by year"
                type="number"
                className="bg-slate-800/50 border-slate-700 focus:border-cyan-400"
              />
            </div>
            <div>
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Publication Date</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                {sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Clear
              </Button>
            </div>
          </div>
          
          {/* Results Info */}
          {hasSearched && (
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div>
                {isLoading ? (
                  "Searching..."
                ) : (
                  `${results.length} results found${searchTerm ? ` for "${searchTerm}"` : ''}`
                )}
              </div>
              {results.length > resultsPerPage && (
                <div>
                  Showing {((currentPage - 1) * resultsPerPage) + 1}-{Math.min(currentPage * resultsPerPage, results.length)} of {results.length}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Search Results */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="bg-slate-800/50 border-slate-700 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-slate-700 rounded mb-3"></div>
                    <div className="h-4 bg-slate-700 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded mb-4 w-1/2"></div>
                    <div className="h-16 bg-slate-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : hasSearched && results.length === 0 ? (
            // No results
            <EmptyState
              message="No papers found"
              description="Try adjusting your search terms or filters. You can search by title, author, abstract, or keywords."
              icon={<Search className="w-12 h-12 text-slate-400" />}
              action={
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Clear all filters
                </Button>
              }
            />
          ) : paginatedResults.length > 0 ? (
            // Search results
            <>
              {paginatedResults.map((paper) => (
                <Card key={paper.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/10">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Title and Status */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                            {highlightText(paper.title, searchTerm)}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="secondary" 
                              className="bg-green-600/20 text-green-400 border-green-600/30"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Published
                            </Badge>
                            {paper.fileUrl && (
                              <Badge variant="outline" className="border-slate-600 text-slate-400">
                                <Download className="w-3 h-3 mr-1" />
                                {paper.fileType?.toUpperCase() || 'PDF'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Authors */}
                      <div className="flex items-center text-sm text-slate-300">
                        <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{highlightText(paper.authors.join(', '), authorFilter)}</span>
                      </div>
                      
                      {/* Abstract */}
                      <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                        {highlightText(paper.abstract, searchTerm)}
                      </p>
                      
                      {/* Keywords */}
                      {paper.keywords.length > 0 && (
                        <div className="flex items-start text-sm text-slate-400">
                          <Hash className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {paper.keywords.slice(0, 5).map((keyword) => (
                              <Badge 
                                key={keyword} 
                                variant="outline" 
                                className="border-slate-600 text-slate-400 text-xs"
                              >
                                {highlightText(keyword, keywordFilter)}
                              </Badge>
                            ))}
                            {paper.keywords.length > 5 && (
                              <Badge 
                                variant="outline" 
                                className="border-slate-600 text-slate-400 text-xs"
                              >
                                +{paper.keywords.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Date and Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center text-sm text-slate-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Published {formatDate(paper.publishedAt)}</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          {paper.fileUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(paper.fileUrl, '_blank')}
                              className="border-cyan-600/50 text-cyan-400 hover:bg-cyan-600/10 hover:text-cyan-300"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            onClick={() => setCurrentPage(pageNum)}
                            className={currentPage === pageNum 
                              ? "bg-cyan-600 hover:bg-cyan-700 text-white" 
                              : "border-slate-600 text-slate-300 hover:bg-slate-700"
                            }
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : !hasSearched ? (
            // Initial state
            <EmptyState
              message="Start your academic discovery"
              description="Search for papers by title, author, keywords, or topic. Use the filters above to narrow down your results."
              icon={<Search className="w-12 h-12 text-slate-400" />}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Search;

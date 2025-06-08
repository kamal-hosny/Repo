import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Users, Award } from 'lucide-react';

export const NewsSection = () => {
  const newsItems = [
    {
      category: "Research",
      title: "Breakthrough in Renewable Energy Research",
      excerpt: "Our engineering team develops innovative solar panel technology that increases efficiency by 40%.",
      date: "June 5, 2025",
      readTime: "5 min read",
      image: "🔬"
    },
    {
      category: "Achievement",
      title: "International Recognition for Medical Program",
      excerpt: "Enterprise University's medical school receives top ranking in global healthcare education survey.",
      date: "June 3, 2025",
      readTime: "3 min read",
      image: "🏆"
    },
    {
      category: "Event",
      title: "Annual Innovation Summit 2025",
      excerpt: "Join us for three days of cutting-edge presentations, workshops, and networking opportunities.",
      date: "June 1, 2025",
      readTime: "2 min read",
      image: "💡"
    },
    {
      category: "Community",
      title: "Student Volunteer Initiative Reaches 10,000 Hours",
      excerpt: "Our students have contributed over 10,000 hours of community service this academic year.",
      date: "May 30, 2025",
      readTime: "4 min read",
      image: "🤝"
    }
  ];

  const upcomingEvents = [
    {
      date: "Jun 15",
      title: "Graduation Ceremony 2025",
      time: "10:00 AM",
      location: "University Stadium"
    },
    {
      date: "Jun 20",
      title: "Summer Research Symposium",
      time: "2:00 PM",
      location: "Academic Center"
    },
    {
      date: "Jun 25",
      title: "Alumni Networking Event",
      time: "6:00 PM",
      location: "Grand Hall"
    }
  ];

  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            News & Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest developments, achievements, and upcoming events 
            from our vibrant university community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Latest News</h3>
              <Button variant="outline">View All News</Button>
            </div>
            
            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{item.image}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {item.category}
                          </span>
                          <span className="text-gray-500 text-sm">{item.date}</span>
                          <span className="text-gray-500 text-sm">• {item.readTime}</span>
                        </div>
                        <h4 className="text-lg font-serif font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto text-blue-600 hover:text-blue-700"
                        >
                          Read More
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Events Sidebar */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-serif font-bold text-gray-900">Upcoming Events</h3>
            </div>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="text-center min-w-[50px]">
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold">
                          {event.date}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{event.time}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg mt-6">
              <CardContent className="p-6">
                <h4 className="font-serif font-semibold text-gray-900 mb-4">This Month</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">1,200</p>
                      <p className="text-sm text-gray-600">New Students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <Award className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">45</p>
                      <p className="text-sm text-gray-600">Research Papers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">23</p>
                      <p className="text-sm text-gray-600">Campus Events</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

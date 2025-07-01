export default function TeamSection() {
  const companies = [
    { 
      name: "Google", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      fallback: "🔍"
    },
    { 
      name: "Microsoft", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      fallback: "🪟"
    },
    { 
      name: "Apple", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      fallback: "🍎"
    },
    { 
      name: "Amazon", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      fallback: "📦"
    },
    { 
      name: "Meta", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
      fallback: "📘"
    },
    { 
      name: "Netflix", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      fallback: "🎬"
    },
    { 
      name: "Tesla", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
      fallback: "⚡"
    },
    { 
      name: "Salesforce", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      fallback: "☁️"
    },
    { 
      name: "Adobe", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
      fallback: "🎨"
    },
    { 
      name: "Spotify", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
      fallback: "🎵"
    },
    { 
      name: "Uber", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
      fallback: "🚗"
    },
    { 
      name: "Airbnb", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
      fallback: "🏠"
    },
  ];

  return (
    <section id="trusted-companies" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our database includes 200M+ companies worldwide, from startups to Fortune 500
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <span className="text-3xl hidden">{company.fallback}</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {company.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              And 200,000,000+ More Companies
            </h3>
            <p className="text-muted-foreground mb-6">
              From small startups to global enterprises, we have companies in every industry and location
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Industries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Distribution</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Human Review</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

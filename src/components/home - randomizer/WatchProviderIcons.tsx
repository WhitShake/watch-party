import React from 'react'

interface ProviderObject {
    logo_path: string;
    provider_name: string
    path: string
  }

interface IconProps {
    providers: ProviderObject[];
  }

export const WatchProviderIcons: React.FC<IconProps> = ( { providers } ) => {
    return (
        <div className="provider-image-gallery">
          {providers.map((provider, index) => (
            <a href={provider.path} target="_blank" rel="noopener noreferrer">
              <img
                key={index}
                src={`http://image.tmdb.org/t/p/w92/${provider.logo_path}`}
                alt={`Provider Logo ${index}`}
                className="provider-logo"
              />
            </a>
          ))}
        </div>
      );
    };
    
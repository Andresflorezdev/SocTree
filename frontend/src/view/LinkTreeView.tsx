import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { social } from '../data/social';
import DevTreeInput from '../components/DevTreeInput';
import { isValidUrl } from '../utils';
import { toast } from 'sonner';
import { updateProfile } from '../api/SocTreeAPI';
import type { DevTreeLink, SocialNetwork, User } from '../types';

export default function LinkTreeView() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(['user']);
  const [devTreeLinks, setDevTreeLinks] = useState<DevTreeLink[]>(() => {
    if (!user || !user.links) return social;

    try {
      return social.map((item) => {
        const userLink = (JSON.parse(user.links) as SocialNetwork[]).find(
          (link) => link.name === item.name,
        );

        if (userLink) {
          return { ...item, url: userLink.url, enabled: userLink.enabled };
        }

        return item;
      });
    } catch {
      return social;
    }
  });
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Actualizado Correctamente');
    },
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    setDevTreeLinks(updatedLinks);
  };

  let links: SocialNetwork[] = [];
  try {
    links = JSON.parse(user?.links ?? '[]');
  } catch (error) {
    console.error('Error al parsear user.links:', user?.links, error);
    links = [];
  }

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error('URL no valida');
        }
      }
      return link;
    });
    setDevTreeLinks(updatedLinks);

    let updatedItems: SocialNetwork[] = [];
    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork,
    );
    if (selectedSocialNetwork?.enabled) {
      const id = links.filter(link => link.id).length + 1
      if (links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if(link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id
            }
          } else {
            return link
          }
        })
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        };
      updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
      updatedItems = links.map(link => {
        if(link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1
          }
        } else {
          return link
        }
      })
    }

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
        onClick={() => user && mutate(queryClient.getQueryData(['user'])!)}
      >
        Guardar Cambios
      </button>
    </div>
  );
}

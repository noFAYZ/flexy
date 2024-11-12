import React from 'react';
import { Card, Button, Modal, useDisclosure } from '@nextui-org/react';
import { Image as ImageIcon, Download, ExternalLink, Play } from 'lucide-react';
import { formatDateTime, getRelativeTimeString } from "./utils/dateFormatters";
import Image from 'next/image';

interface Media {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  date: Date;
  size?: string;
}

interface SharedMediaGridProps {
  media?: Media[];
}

export const SharedMediaGrid: React.FC<SharedMediaGridProps> = ({ media = [] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMedia, setSelectedMedia] = React.useState<Media | null>(null);

  const handleMediaClick = (media: Media) => {
    setSelectedMedia(media);
    onOpen();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Shared Media</h4>
        <Button size="sm" variant="light">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {media.slice(0, 9).map((item) => (
          <Card 
            key={item.id}
            isPressable
            className="aspect-square overflow-hidden"
          >
            <Image
              src={item.thumbnail}
              alt=""
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-2 right-2 flex gap-1">
                {item.type === 'video' && (
                  <div className="absolute top-2 left-2">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                )}
                <Button
                  isIconOnly
                  size="sm"
                  className="bg-black/50 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle download
                  }}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Media Preview Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        {selectedMedia && (
          <div className="p-4">
            {selectedMedia.type === 'image' ? (
              <Image
                src={selectedMedia.url}
                alt=""
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                className="w-full rounded-lg"
              />
            )}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm font-medium">
                  {formatDateTime(selectedMedia.date)}
                </p>
                <p className="text-sm text-default-500">
                  {selectedMedia.size}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="flat"
                  startContent={<Download className="w-4 h-4" />}
                >
                  Download
                </Button>
                <Button
                  variant="flat"
                  startContent={<ExternalLink className="w-4 h-4" />}
                >
                  Open Original
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
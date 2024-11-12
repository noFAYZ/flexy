import { Button } from "@nextui-org/button";
import { FileText, ImageIcon, Play, Download,File } from "lucide-react";
import { formatDateTime, getRelativeTimeString } from "./utils/dateFormatters";

interface File {
    id: string;
    name: string;
    type: string;
    size: string;
    date: Date;
    url: string;
  }
  
  interface SharedFilesListProps {
    files?: File[];
  }
  
  export const SharedFilesList: React.FC<SharedFilesListProps> = ({ files = [] }) => {
    const getFileIcon = (type: string) => {
      // Add more file type icons as needed
      const icons: { [key: string]: JSX.Element } = {
        pdf: <FileText className="w-4 h-4" />,
        doc: <FileText className="w-4 h-4" />,
        image: <ImageIcon className="w-4 h-4" />,
        video: <Play className="w-4 h-4" />,
      };
      return icons[type] || <File className="w-4 h-4" />;
    };
  
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Shared Files</h4>
          <Button size="sm" variant="light">
            View All
          </Button>
        </div>
        
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-default-100"
            >
              <div className="p-2 rounded-lg bg-default-100">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {file.name}
                </p>
                <div className="flex items-center gap-2 text-xs text-default-500">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{formatDateTime(file.date)}</span>
                </div>
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => window.open(file.url, '_blank')}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };
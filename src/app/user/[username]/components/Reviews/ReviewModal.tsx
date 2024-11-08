import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, Chip, Avatar, ModalFooter } from "@nextui-org/react";
import { Star } from "lucide-react";

export const DetailedReviewModal = ({ work, isOpen, onClose }) => {
    if (!work) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{work.title}</h2>
            <p className="text-sm text-gray-500">{work.clientName}</p>
          </ModalHeader>
          <ModalBody>
            <div className="mb-4">
              <Chip
                variant="flat"
                className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white"
              >
                {work.amount}
              </Chip>
            </div>
            <p className="text-base mb-4">{work.review}</p>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < work.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-lg font-medium">
                {work?.rating?.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center">
              <Avatar src={work.clientAvatar} size="lg" className="mr-4" />
              <div>
                <p className="font-semibold">{work.clientName}</p>
                <span className="text-sm text-gray-500">
                  {new Date(work.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
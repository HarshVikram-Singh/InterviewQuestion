export interface CardProps {
  id: number;
  type: string;
  title: string;
  position: number;
  onClick: () => void;
  onDragStart: (position: number) => void;
  onDrop: (position: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

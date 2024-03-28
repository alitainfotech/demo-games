import "./Card.css";

export interface ICardProps {
  frontChildren: React.ReactNode;
  backChildren?: React.ReactNode;
  flipStatus: boolean;
  handleClick: Function;
  id?: number;
  disableFlip: boolean;
}

export default function Card(props: ICardProps) {
  return (
    <div className={`card w-full h-64 shadow-2xl relative border-8 border-white rounded-md ${props.flipStatus && 'flip'}`} onClick={!props.disableFlip ? () => props.handleClick(props.id, props.flipStatus) : () => { }}>
      <div className="front w-full h-full border bg-white border-slate-900 rounded-md p-1 absolute flex justify-center items-center">
        {props.frontChildren}
      </div>
      <div className="back w-full h-full bg-yellow-400 rounded-md p-1 absolute flex justify-center items-center">
      </div>
    </div>
  );
}

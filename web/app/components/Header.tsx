type HeaderProps = {
  title: string;
};

export default function Header(props: HeaderProps) {
  return (
    <div className="w-32 py-12 pb-8 flex">
      <p className="font-Inter text-4xl tracking-widest">{props.title}</p>
    </div>
  );
}

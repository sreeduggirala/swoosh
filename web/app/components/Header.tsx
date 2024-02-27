type HeaderProps = {
  title: string;
};

export default function Header(props: HeaderProps) {
  return (
    <div className="w-32 py-16 pb-8">
      <p className="font-Inter text-4xl tracking-widest">{props.title}</p>
    </div>
  );
}

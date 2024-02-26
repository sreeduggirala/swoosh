type HeaderProps = {
  title: string;
};

export default function Header(props: HeaderProps) {
  return (
    <div className="w-full py-16 ">
      <p className="font-Inter text-4xl  tracking-widest">{props.title}</p>
    </div>
  );
}

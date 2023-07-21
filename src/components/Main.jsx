export default function Main(props) {
  return (
    <main className='container mx-auto mt-10 px-5 flex-column'>
      {props.children}
    </main>
  );
}

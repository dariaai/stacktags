import HomePage from "./components/HomePage";
import TagsProvider from "./providers/TagsProvider";

function App() {
  return (
    <TagsProvider>
      <HomePage />
    </TagsProvider>
  );
}

export default App;

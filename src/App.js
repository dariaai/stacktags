import HomePage from "./components/HomePage";
import TagsProvider from "./components/providers/TagsProvider";

function App() {
  return (
    <TagsProvider>
      <HomePage />
    </TagsProvider>
  );
}

export default App;

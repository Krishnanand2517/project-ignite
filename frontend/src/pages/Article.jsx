import { useEffect } from "react";
import Prism from "prismjs";
import "../prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { CodeBlock } from "../components";
import { Likes } from "../components";

const Article = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const article = {
    title: "6 React Hooks You Need to Know",
    imgPath: "/HashNode-Hooks-Blog.jpg",
    content: `React has revolutionized the way we build user interfaces by introducing hooks, which allow us to manage states, side effects, and other React concepts more elegantly and efficiently. In this article, we'll dive into the six most important React hooks:

      useState
      
      useEffect
      
      useContext
      
      useRef
      
      useCallback
      
      useMemo
      
      We'll explore how each of them works and why they are vital in modern React development.

      
      useState


      The useState hook is the fundamental building block of state management in React functional components. It allows you to declare and update state variables within your components.
      
      useState takes an initial state value as an argument and returns an array with two values: the current state and a function to update that state. By calling the state update function, React will automatically re-render the component with the new state.
      
      Here's a simple implementation:

      
      \`\`\`jsx
      import { useState } from 'react';
      
      const Counter = () => {
        const [count, setCount] = useState(0);
      
        return (
          <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
          </div>
        );
      };
      
      export default Counter;
      \`\`\`


      In the above example, useState initializes the count state variable to 0. The setCount function is used to update the state when the button is clicked.

      
      useEffect


      useEffect is a powerful hook for managing side effects in your components. It allows you to perform actions like data fetching, DOM manipulation, or setting up and cleaning up resources.
      
      The hook accepts two arguments: a function that contains your side effect code and an array of dependencies. The function is executed after the component renders, and if the dependencies change, the function is re-run. An empty dependency array [] means that the code runs only once when the component mounts.
      
      Here's an example:

      
      \`\`\`jsx
      import { useState, useEffect } from 'react';
      
      const WeatherDisplay = () => {
        const [weather, setWeather] = useState(null);
        const [city, setCity] = useState('New Delhi');
      
        useEffect(() => {
          // This code will run when the component first mounts and whenever 'city' changes.
          fetch(\`https://api.example.com/weather/\${city}\`)
            .then(response => response.json())
            .then(data => setWeather(data))
            .catch(error => console.error(error));
        }, [city]); // 'city' is a dependency
      
        return (
          <div>
            <h2>Weather in {city}</h2>
            {weather ? (
              <div>
                <p>Temperature: {weather.temperature}°C</p>
                <p>Conditions: {weather.conditions}</p>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
      
            <button onClick={() => setCity('Paris')}>Change City to Paris</button>
          </div>
        );
      };
      
      export default WeatherDisplay;
      \`\`\`


      In this example, we fetch weather data for a specific city. We use useState to manage the weather state and the city state. The useEffect hook is used to fetch weather data when the component mounts and whenever the city state changes.
      
      The dependency array [city] specifies that the effect should run whenever the city state changes. When the "Change City to Paris" button is clicked, the city state is updated, and the effect runs again, fetching weather data for the new city.

      
      useContext


      The useContext hook is used to access the context within a component. Context allows you to share data between components without the need to pass props through intermediate components.
      
      It's especially useful for managing application-wide settings and states. It simplifies the process of accessing global or shared data in your app.
      
      If a context has been created in some other file "ColorContext.js": const ThemeContext = React.createContext('light') , then we can use that context with the useContext hook as shown below:
      
      
      \`\`\`jsx
      import { useContext } from 'react';
      import ThemeContext from './context/ThemeContext';
      
      const ThemeDisplay = () => {
        const theme = useContext(ThemeContext);
      
        return <p>Current theme: {theme}</p>;
      };
      
      export default ThemeDisplay;
      \`\`\`


      useRef


      useRef provides a way to create and manage references to DOM elements or other values that persist across renders. It's useful for accessing and modifying the DOM directly or to store mutable values without causing unnecessary re-renders.
      
      You can think of a useRef as a way to "hold onto" a reference to a specific element or value so that you can interact with it or retrieve its current state whenever needed. Also, changes to useRef values won't trigger a re-render, which is often desired for performance optimization.
      
      Here's a simple example:

      
      \`\`\`jsx
      import { useRef } from 'react';
      
      const TextInputWithFocus = () => {
        // Create a ref using the useRef hook
        const inputRef = useRef(null);
      
        const focusInput = () => {
          // Use the ref to focus on the input element
          inputRef.current.focus();
        };
      
        return (
          <div>
            <input type="text" ref={inputRef} />
            <button onClick={focusInput}>Focus Input</button>
          </div>
        );
      };
      
      export default TextInputWithFocus;
      \`\`\`


      In the focusInput function, we use inputRef.current to access the DOM element that the inputRef is referencing, and we call the focus() method on it. This action focuses on the input element when the button is clicked.

      
      useCallback


      useCallback is used for memoizing functions, which prevents unnecessary re-creation of function instances. It's essential for optimizing performance, especially when passing functions as props to child components.

      
      \`\`\`jsx
      import { useState, useCallback } from 'react';
      
      const App = () => {
        const [count, setCount] = useState(0);
      
        const increment = useCallback(() => {
          setCount(count + 1);
        }, [count]);
      
        return (
          <div>
            <h1>Count: {count}</h1>
            <CounterButton onClick={increment} label="Increment" />
          </div>
        );
      };
      
      export default App;
      \`\`\`


      Without useCallback: Every time the App component re-renders, a new increment function is created.
      
      With useCallback: The increment function is only created once, thanks to memoization.

      
      useMemo


      The useMemo hook is used for memoizing the result of expensive calculations, helping to improve performance; especially when you have expensive calculations or computations that don't need to be repeated unnecessarily. It's useful when you need to compute a value based on the component's props or state.
      
      It takes a function and an array of dependencies and returns the memoized value, which only recalculates when the dependencies change.
      
      Here's a simple implementation:
      

      \`\`\`jsx
      import React, { useState, useMemo } from 'react';
      
      const App = () => {
        const [number, setNumber] = useState(5);
        const [isDark, setIsDark] = useState(false);
      
        // Calculate the square of the number using useMemo
        const square = useMemo(() => {
          console.log('Calculating square...');
          return number * number;
        }, [number]);
      
        return (
          <div>
            <h1>Number: {number}</h1>
            <h2>Square: {square}</h2>
            <button onClick={() => setNumber(number + 1)}>Increment</button>
      
            <button onClick={() => setIsDark(!isDark)}>Toggle Theme</button>
          </div>
        );
      };
      
      export default App;
      \`\`\`


      Without useMemo: If you click on the Toggle Theme button, the square value will be calculated, even though the number is not changing.
      
      With useMemo: The square value is calculated only if the number changes by clicking on the Increment button, or any other way.

      
      Conclusion


      These are the most important React hooks that every developer should be familiar with when building React applications. By understanding and effectively using these hooks, you empower yourself to tackle a wide range of challenges, from state management to handling side-effects, optimizing performance, and seamlessly sharing data across components.
      
      As you continue your journey in React development, remember that the key to harnessing the full potential of these hooks lies in understanding when and how to use them effectively. Experiment with these hooks, explore their various use cases, and apply them to your projects. With these tools at your disposal, you're well on your way to becoming a skilled and efficient React developer. Happy coding! https://krishnanand.hashnode.dev/6-react-hooks-you-need-to-know`,
  };

  const splitContent = article.content.split(
    /(\n\s*\n\s*\n|```jsx\n[\s\S]+?```)/
  );

  return (
    <div className="w-full line-numbers pt-32 pb-4 px-48 bg-gradient-to-b from-primary via-slate-800 to-secondary">
      <div className="w-full border border-white rounded-lg shadow-xl shadow-blue-400 mb-20">
        <img src={article.imgPath} alt={article.title} className="rounded-lg" />
      </div>
      <h1 className="mb-16 text-6xl 2xl:text-8xl text- font-fira font-bold text-primary">
        {article.title}
      </h1>
      <div className="w-full 2xl:text-xl">
        {splitContent.map((paragraph, index) => (
          <div key={index} className="my-4">
            {paragraph.startsWith("```jsx") ? (
              <CodeBlock paragraph={paragraph} language="javascript" />
            ) : (
              <p className="text-secondary text-lg 2xl:text-2xl font-inconsolata">
                {paragraph}
              </p>
            )}
          </div>
        ))}
      </div>
      <Likes likesCount={23} className="mt-12" />
    </div>
  );
};

export default Article;

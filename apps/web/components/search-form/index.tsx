"use client"

import { KeyboardEventHandler, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchForm(props: {
  q: string;
}) {
  const [text, setText] = useState(props.q);
  const onSearch = (q: string) => {
    window.location.href = `/search?q=${q}`;
  };
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key == "Enter") {
      onSearch(text);
    }
  }
  return (
    <div className="flex w-full max-w-md items-center gap-2 p-8">
      <Input
        placeholder="Enter the name you want to use"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <Button type="submit" variant="outline" onClick={() => onSearch(text)}>
        Search
      </Button>
    </div>
  );
}

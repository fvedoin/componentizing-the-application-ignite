import { useState, useEffect } from "react";
import { Button } from "./Button";
import { api } from "../services/api";

import Genre from "../models/Genre";

import "../styles/sidebar.scss";

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId(id: number): void;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.setSelectedGenreId(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

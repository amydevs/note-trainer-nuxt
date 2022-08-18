import { Note } from "../note";
import { MinMaxNote } from "../note/randomizer";

export class PlaySettingsProps {
  enable_treble = true;
  enable_bass = true;
  min_max_treble = new MinMaxNote(new Note("A", 4),new Note("C", 5));
  min_max_bass = new MinMaxNote(new Note("A", 2), new Note("C", 4));
}

import { Command } from "../interfaces/command";
import { ping } from "./ping";
import { avatar } from "./avatar"

export const CommandList: Command[] = [ping, avatar]
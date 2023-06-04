import { integer } from "@protofire/subgraph-toolkit";
import {
  Minted
} from "../generated/User/User"
import {
  User
} from "../generated/schema"


export function handleMint(event: Minted): void {
  let token = User.load(event.params.to);
  if (!token) {
    token = new User(event.params.to);
  }
  token.hash = event.params.ipfsHash

  token.save()
}


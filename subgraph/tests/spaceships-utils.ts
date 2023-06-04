import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  EquipmentModified,
  OwnershipTransferred,
  PublicMint,
  PublicSaleOpened,
  SpaceshipRaritySet,
  Transfer,
  WithdrawETH
} from "../generated/Spaceships/Spaceships"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createEquipmentModifiedEvent(
  spaceshipId: BigInt,
  fireEquipmentId: BigInt,
  lightningEquipmentId: BigInt,
  steelEquipmentId: BigInt,
  speed: BigInt
): EquipmentModified {
  let equipmentModifiedEvent = changetype<EquipmentModified>(newMockEvent())

  equipmentModifiedEvent.parameters = new Array()

  equipmentModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "spaceshipId",
      ethereum.Value.fromUnsignedBigInt(spaceshipId)
    )
  )
  equipmentModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "fireEquipmentId",
      ethereum.Value.fromUnsignedBigInt(fireEquipmentId)
    )
  )
  equipmentModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "lightningEquipmentId",
      ethereum.Value.fromUnsignedBigInt(lightningEquipmentId)
    )
  )
  equipmentModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "steelEquipmentId",
      ethereum.Value.fromUnsignedBigInt(steelEquipmentId)
    )
  )
  equipmentModifiedEvent.parameters.push(
    new ethereum.EventParam("speed", ethereum.Value.fromUnsignedBigInt(speed))
  )

  return equipmentModifiedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPublicMintEvent(to: Address, amount: BigInt): PublicMint {
  let publicMintEvent = changetype<PublicMint>(newMockEvent())

  publicMintEvent.parameters = new Array()

  publicMintEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  publicMintEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return publicMintEvent
}

export function createPublicSaleOpenedEvent(
  status: boolean,
  timestamp: BigInt
): PublicSaleOpened {
  let publicSaleOpenedEvent = changetype<PublicSaleOpened>(newMockEvent())

  publicSaleOpenedEvent.parameters = new Array()

  publicSaleOpenedEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )
  publicSaleOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return publicSaleOpenedEvent
}

export function createSpaceshipRaritySetEvent(
  spaceshipId: BigInt,
  rarity: i32
): SpaceshipRaritySet {
  let spaceshipRaritySetEvent = changetype<SpaceshipRaritySet>(newMockEvent())

  spaceshipRaritySetEvent.parameters = new Array()

  spaceshipRaritySetEvent.parameters.push(
    new ethereum.EventParam(
      "spaceshipId",
      ethereum.Value.fromUnsignedBigInt(spaceshipId)
    )
  )
  spaceshipRaritySetEvent.parameters.push(
    new ethereum.EventParam(
      "rarity",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(rarity))
    )
  )

  return spaceshipRaritySetEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createWithdrawETHEvent(amountWithdrawn: BigInt): WithdrawETH {
  let withdrawEthEvent = changetype<WithdrawETH>(newMockEvent())

  withdrawEthEvent.parameters = new Array()

  withdrawEthEvent.parameters.push(
    new ethereum.EventParam(
      "amountWithdrawn",
      ethereum.Value.fromUnsignedBigInt(amountWithdrawn)
    )
  )

  return withdrawEthEvent
}

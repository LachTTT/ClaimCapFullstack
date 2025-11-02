from algopy import ARC4Contract, UInt64, String, Global, Txn, Account, BoxMap
from algopy.arc4 import abimethod


class ClaimCap(ARC4Contract):
    def __init__(self) -> None:
        self.owners = BoxMap(Account, UInt64)  # wallet -> timestamp
        self.claim_count = UInt64(0)    # counter

        self.MAX_CLAIMS = UInt64(100)
        self.PRICE = UInt64(100000)
        self.HOLD_PERIOD = UInt64(30 * 24 * 60 * 60)

    @abimethod()
    def buy_nft(self, amount:UInt64) -> String:
        sender = Txn.sender

        if amount < self.PRICE:
            return String(" Need to pay 0.1 ALGO to buy NFT!")

        if self.owners[sender] != UInt64(0):
            return String(" You already own an NFT!")

        count = self.claim_count
        if count >= self.MAX_CLAIMS:
            return String(" All NFTs sold!")

        self.owners[sender] = Global.latest_timestamp
        self.claim_count += 1

        
        return String(" NFT purchased! You must hold it for 30 days.")

    @abimethod()
    def sell_nft(self, buyer: Account) -> String:
        sender = Txn.sender
        buyer_bytes = buyer
        purchase_time = self.owners[sender]

        if purchase_time == UInt64(0):
            return String(" You don't own an NFT.")

        now = Global.latest_timestamp
        if now - purchase_time < self.HOLD_PERIOD:
            return String(" Hold period (30 days) not finished yet!")

        self.owners[buyer_bytes] = now
        self.owners[sender] = UInt64(0)
        return String("NFT sold successfully!")

    @abimethod()
    def check_hold_days(self) -> UInt64:
        sender = Txn.sender
        purchase_time = self.owners[sender]
        if purchase_time == UInt64(0):
            return UInt64(0)
        return purchase_time

    @abimethod()
    def get_claim_count(self) -> UInt64:
        return self.claim_count

    @abimethod()
    def hello(self, name: String) -> String:
        return String("Hello {name}! Welcome to ClaimCap Market ")

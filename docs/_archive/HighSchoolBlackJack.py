import random

suits = ('Clubs', 'Diamonds', 'Spades', 'Hearts')
cards = ('2', '3', '4', '5', '6', '7', '8', '9', '10','Jack', 'Queen', 'King', 'Ace')
card_values = {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10,'Jack':10, 'Queen':10, 'King':10, 'Ace':1 or 11}

def ace(cards):
  for i in range(len(cards)):
    if cards[i] == 'Ace':
      print ("\n" + str(cards))
      num = input("Is this ace an 1 or an 11?\n>")
      while num != '1' or num != '11':
        if num == '1':
          return int(1)
        elif num == '11':
          return int(11)

#The identification of the card
class Card:
  def __init__(self, suit, card):
    self.suit = suit
    self.card = card
  def __str__(self):
    return self.card + ' of ' + self.suit

#The deck and various variables to it
class Deck:
  def __init__(self):
    self.deck = []
    for suit in suits:
      for card in cards:
        self.deck.append(Card(suit, card))

  def __str__(self):
    deck_total = ''
    for card in self.deck:
      deck_total += '\n' + card.__str__()
    return 'The deck has' + deck_total

  def deal(self):
    single_card = self.deck.pop()
    return single_card

  def shuffle(self):
    random.shuffle(self.deck)


#Class for cards that are in-hand
class Cards_in_game:
  def __init__(self):
    self.cards = []
    self.score = 0
  
  def add_card(self, card):
    self.cards.append(card)
    self.score += card_values[card.card]

def plays(deck, Cards_in_game):
  Cards_in_game.add_card(deck.deal())

def playOrSit(deck, Cards_in_game):
  global gamePlay

  while True:
    choice = input("Do you choose to play or sit? Please type 'play' or 'sit': ")

    if choice == 'play':
      plays(deck, Cards_in_game)
    elif choice == 'sit':
      print("You have chosen to sit. The dealer is now drawing")
      gamePlay = False
    #failsafe
    else:
      print("Insufficient input")
      continue
    break

def hide_cards(you, dealer):
  print("\nDealer's Hand")
  print("<hidden card>")
  print(' ', dealer.cards[1])
  print("\nYour cards: ", *you.cards, sep= '\n')
        
def show_cards(you, dealer):
  print("\nDealer's Hand:", *dealer.cards, sep="\n")
  print("Dealer's Hand =",dealer.score)
  print("\nPlayer's Hand: ", *you.cards, sep= '\n')
  print("Player's Hand = ", you.score)

def youBust(you, dealer):
  print("You busted :(")
def youWinner(you, dealer):
  print("CONGRATS YOU BEAUTIFUL HUMAN! YOU WON!")
def dealerBust(you, dealer):
  print("The dealer has made a grave error and busts!")
def dealerWins(you, dealer):
  print("The dealer wins and you are a loser :(")
def tie(you, dealer):
  print("You did not come out victorious, but at least you are not a loser!")

#Introduction and Summary
def intro():
  print(' ')
  print('Welcome to the table! Today we will be playing the beautiful game of black jack. I hope you are ready to lose some money!')
  print(' ')
  print('The goal of the game is to beat the dealer himself and reach the score of 21 without going over.')

gamePlay = True

while True:
  print(intro())

  deck = Deck()
  deck.shuffle()

  your_hand = Cards_in_game()
  your_hand.add_card(deck.deal())
  your_hand.add_card(deck.deal())

  dealers_hand = Cards_in_game()
  dealers_hand.add_card(deck.deal())
  dealers_hand.add_card(deck.deal())

  while gamePlay:
    playOrSit(deck, your_hand)

    show_cards(your_hand, dealers_hand)

    if your_hand.score > 21:
      youBust(your_hand, dealers_hand)

      break
      
    if your_hand.score <= 21:
      playOrSit(deck, dealers_hand)

      while dealers_hand.score < 17:
        plays(deck, dealers_hand)

      show_cards(your_hand, dealers_hand)
  
      if dealers_hand.score > 21:
        dealerBust(your_hand, dealers_hand)

      elif dealers_hand.score > your_hand.score:
        dealerWins(your_hand, dealers_hand)

      elif dealers_hand.score < your_hand.score:
        youWinner(your_hand, dealers_hand)

      else:
        tie(your_hand, dealers_hand)

  again = input("How was your game? Do you wanna try your luck again? Please type 'y' for yes or 'n' for no: ")
  print(' ')
  if again == 'y':
    gamePlay = True
  else:
    print('We appreciate your time at the table. Come back soon!')

    break
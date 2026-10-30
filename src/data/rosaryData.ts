import { RosaryMystery } from '../types/prayer';

export const ROSARY_MYSTERIES: RosaryMystery[] = [
  {
    id: 'joyful',
    name: 'The Joyful Mysteries',
    days: 'Monday & Saturday',
    dayIndices: [1, 6], // Mon, Sat
    imagePrefix: 'joy',
    mysteries: [
      {
        number: 1,
        title: 'The Annunciation of the Lord to Mary',
        scripture: 'The angel Gabriel said to Mary: "Do not be afraid, Mary, for you have found favor with God. You will conceive in your womb and bear a son, and you shall name him Jesus."',
        fruit: 'Humility',
        image: '/images/rosary/joy1.jpg'
      },
      {
        number: 2,
        title: 'The Visitation of Mary to Elizabeth',
        scripture: 'Elizabeth was filled with the Holy Spirit and cried out in a loud voice: "Most blessed are you among women, and blessed is the fruit of your womb!"',
        fruit: 'Love of Neighbor / Charity',
        image: '/images/rosary/joy2.jpg'
      },
      {
        number: 3,
        title: 'The Nativity of Jesus in Bethlehem',
        scripture: 'And she gave birth to her firstborn son and wrapped him in swaddling clothes and laid him in a manger, because there was no room for them in the inn.',
        fruit: 'Poverty of Spirit / Detachment',
        image: '/images/rosary/joy3.jpg'
      },
      {
        number: 4,
        title: 'The Presentation of Jesus in the Temple',
        scripture: 'Simeon took the child Jesus into his arms and blessed God, saying: "Now, Master, you may let your servant go in peace, according to your word."',
        fruit: 'Purity of Mind and Body / Obedience',
        image: '/images/rosary/joy4.jpg'
      },
      {
        number: 5,
        title: 'The Finding of Jesus in the Temple',
        scripture: 'After three days they found him in the temple, sitting in the midst of the teachers, listening to them and asking them questions.',
        fruit: 'Piety / Joy in Finding Jesus',
        image: '/images/rosary/joy5.jpg'
      }
    ]
  },
  {
    id: 'luminous',
    name: 'The Luminous Mysteries',
    days: 'Thursday',
    dayIndices: [4], // Thu
    imagePrefix: 'lite',
    mysteries: [
      {
        number: 1,
        title: 'The Baptism of Jesus in the Jordan',
        scripture: 'After Jesus was baptized, a voice from heaven said: "This is my beloved Son, with whom I am well pleased."',
        fruit: 'Openness to the Holy Spirit',
        image: '/images/rosary/lite1.jpg'
      },
      {
        number: 2,
        title: 'The Wedding Feast at Cana',
        scripture: 'His mother said to the servers: "Do whatever he tells you." Jesus performed the first of his signs in Cana in Galilee.',
        fruit: 'To Jesus through Mary / Trust in God',
        image: '/images/rosary/lite2.jpg'
      },
      {
        number: 3,
        title: 'The Proclamation of the Kingdom of God',
        scripture: '"This is the time of fulfillment. The kingdom of God is at hand. Repent, and believe in the gospel."',
        fruit: 'Repentance and Trust in God',
        image: '/images/rosary/lite3.jpg'
      },
      {
        number: 4,
        title: 'The Transfiguration of Jesus on Mount Tabor',
        scripture: 'And he was transfigured before them; his face shone like the sun and his clothes became white as light.',
        fruit: 'Desire for Holiness',
        image: '/images/rosary/lite4.jpg'
      },
      {
        number: 5,
        title: 'The Institution of the Holy Eucharist',
        scripture: 'While they were eating, Jesus took bread, said the blessing, broke it, and giving it to his disciples said: "Take and eat; this is my body."',
        fruit: 'Eucharistic Devotion',
        image: '/images/rosary/lite5.jpg'
      }
    ]
  },
  {
    id: 'sorrowful',
    name: 'The Sorrowful Mysteries',
    days: 'Tuesday & Friday',
    dayIndices: [2, 5], // Tue, Fri
    imagePrefix: 'sorrow',
    mysteries: [
      {
        number: 1,
        title: 'The Agony of Jesus in the Garden of Gethsemane',
        scripture: 'In his anguish he prayed with greater intensity, and his sweat became like drops of blood falling to the ground.',
        fruit: 'Sorrow for Sin / Conformity to God\'s Will',
        image: '/images/rosary/sorrow1.jpg'
      },
      {
        number: 2,
        title: 'The Scourging of Jesus at the Pillar',
        scripture: 'Then Pilate took Jesus and had him scourged.',
        fruit: 'Mortification of the Senses / Purity',
        image: '/images/rosary/sorrow2.jpg'
      },
      {
        number: 3,
        title: 'The Crowning with Thorns',
        scripture: 'They stripped off his clothes and threw a scarlet military cloak about him. Weaving a crown out of thorns, they placed it on his head.',
        fruit: 'Moral Courage / Contempt of the World',
        image: '/images/rosary/sorrow3.jpg'
      },
      {
        number: 4,
        title: 'The Carrying of the Cross to Calvary',
        scripture: 'Carrying the cross himself he went out to what is called the Place of the Skull, in Hebrew, Golgotha.',
        fruit: 'Patience in Bearing Crosses',
        image: '/images/rosary/sorrow4.jpg'
      },
      {
        number: 5,
        title: 'The Crucifixion and Death of Our Lord Jesus',
        scripture: 'Jesus cried out in a loud voice: "Father, into your hands I commend my spirit." And when he had said this he breathed his last.',
        fruit: 'Salvation / Forgiveness / Self-giving',
        image: '/images/rosary/sorrow5.jpg'
      }
    ]
  },
  {
    id: 'glorious',
    name: 'The Glorious Mysteries',
    days: 'Wednesday & Sunday',
    dayIndices: [0, 3], // Sun, Wed
    imagePrefix: 'glori',
    mysteries: [
      {
        number: 1,
        title: 'The Resurrection of Jesus Christ from the Dead',
        scripture: 'The angel said to the women: "Do not be afraid! I know that you are seeking Jesus the crucified. He is not here, for he has been raised just as he said."',
        fruit: 'Faith',
        image: '/images/rosary/glori1.jpg'
      },
      {
        number: 2,
        title: 'The Ascension of Jesus into Heaven',
        scripture: 'As they were looking on, he was lifted up, and a cloud took him from their sight. And he sat down at the right hand of God.',
        fruit: 'Christian Hope / Desire for Heaven',
        image: '/images/rosary/glori2.jpg'
      },
      {
        number: 3,
        title: 'The Descent of the Holy Spirit at Pentecost',
        scripture: 'And there appeared to them tongues as of fire, which parted and came to rest on each one of them. And they were all filled with the Holy Spirit.',
        fruit: 'Gifts of the Holy Spirit / Zeal',
        image: '/images/rosary/glori3.jpg'
      },
      {
        number: 4,
        title: 'The Assumption of the Blessed Virgin Mary into Heaven',
        scripture: '"Blessed are you, daughter, by the Most High God, above all the women on earth; and blessed be the Lord God."',
        fruit: 'Grace of a Happy Death / Devotion to Mary',
        image: '/images/rosary/glori4.jpg'
      },
      {
        number: 5,
        title: 'The Coronation of Mary as Queen of Heaven and Earth',
        scripture: 'A great sign appeared in the sky, a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars.',
        fruit: 'Trust in Mary\'s Intercession / Eternal Happiness',
        image: '/images/rosary/glori5.jpg'
      }
    ]
  }
];

export const COMMON_PRAYERS = {
  signOfCross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  creed: "I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.",
  ourFather: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.",
  hailMary: "Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
  gloryBe: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.",
  fatimaPrayer: "O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen.",
  hailHolyQueen: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
};

import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";



export default async function handler(req, res) {
  if (req.method === 'GET') {
    const fetchEvents = async () => {
      try {
    //     const eventsRef = collection(db, 'events'); // Create a CollectionReference
    // const eventRef = doc(eventsRef, 'fpB0djArK0pB7L2r7wUE'); // Create a DocumentReference
    // await setDoc(eventRef, {
    //   title: 'Tech Meetup 2024',
    //   description: 'Join us for an exciting tech meetup! We will discuss the latest trends in web development, AI, and cloud computing.',
    //   date: '2024-06-15',
    //   location: 'San Francisco, CA',
    //   capacity: 200
    // });
        const querySnapshot = await getDocs(collection(db, 'events'));
        const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(fetchedData);
      } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Failed to fetch events' });
      }
    };

    await fetchEvents();
  }
   else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
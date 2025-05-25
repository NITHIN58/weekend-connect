import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.status(200).json({ id: docSnap.id, ...docSnap.data() });
    } catch (err) {
      console.error('Error fetching event:', err);
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


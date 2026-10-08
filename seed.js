
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const Catway = require('./models/catway');
const Reservation = require('./models/reservation');

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('La variable MONGO_URI est absente du fichier .env.');
    }

    const catways = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/catways.json'), 'utf8')
    );

    const reservations = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'data/reservations.json'), 'utf8')
    );

    await mongoose.connect(process.env.MONGO_URI);

    for (const catway of catways) {
      await Catway.updateOne(
        { catwayNumber: catway.catwayNumber },
        { $set: catway },
        { upsert: true }
      );
    }

    for (const reservation of reservations) {
      const reservationData = {
        ...reservation,
        startDate: new Date(reservation.startDate),
        endDate: new Date(reservation.endDate)
      };

      const existingReservation = await Reservation.findOne({
        catwayNumber: reservationData.catwayNumber,
        clientName: reservationData.clientName,
        boatName: reservationData.boatName,
        startDate: reservationData.startDate,
        endDate: reservationData.endDate
      });

      if (!existingReservation) {
        await Reservation.create(reservationData);
      }
    }

    console.log('Seed terminé avec succès.');
    console.log(`${catways.length} catways traités.`);
    console.log(`${reservations.length} réservations traitées.`);
  } catch (error) {
    console.error('Erreur pendant le seed :', error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seed();
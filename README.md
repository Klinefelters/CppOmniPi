# OmniPi
A project that uses UDP communication to wirelessly control a raspberry pi with mecanum wheels for omnidirectional movement.
Also has a camera streaming option for those with compatible hardware.
## Set Up
In order to set this up, two devices are needed. A raspberry pi car, and a laptop, jetson, or other coprocessor connected to the pi's wifi network.

### RPI
The raspberry pi needs to be wired correctly, then run:
```bash
pip install -r requirements.txt
```
Then set up a hotspot following these directions:
https://elinux.org/RPI-Wireless-Hotspot

Install the client with the following:
```bash
cd /client
npm i
```

Finally, update constants.py and run the program with:
```bash
python /api/server.py
```

Now you can run the client server in another terminal:
```bash
npm run dev
```

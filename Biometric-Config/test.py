from pyzkfp import ZKFP2

zkfp2 = ZKFP2()
ret = zkfp2.Init()
if ret != 0:
    print("Initialization failed")
    exit(1)

device_count = zkfp2.GetDeviceCount()
print(f"{device_count} device(s) found")

if device_count == 0:
    print("No fingerprint device found. Check connection and drivers.")
    zkfp2.Terminate()
    exit(1)

zkfp2.OpenDevice(0)
print("Fingerprint device opened successfully!")

# Cleanup
zkfp2.Terminate()

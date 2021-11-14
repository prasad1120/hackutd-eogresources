import websockets
import asyncio
import time
import os

import nest_asyncio
nest_asyncio.apply()
# __import__('IPython').embed()

PORT = 7890
client_ws = None
# optimization_ws = None

print("Server listening on Port " + str(PORT))

async def echo(websocket, path):
	global client_ws
	# global optimization_ws
	client_ws = websocket
	print("A client just connected")

	while client_ws is not None:
		time.sleep(5)

		for file in os.listdir():
    		# Check whether file is in text format or not
			if file.endswith(".txt"):
				file_path = f"{file}"
				print(file_path)
				# call read text file function
		
		if file_path:
			with open(file_path, 'r') as f:
				file_content = f.read()
				print(file_content)
				await client_ws.send(file_content)
				os.remove(file_path)

	
	# async for message in websocket:
	# 		await client_ws.send(message)
		

# async def send_message_to_client(message):
# 	try:
# 		if client_ws:
# 			await client_ws.send(message)
# 	except websockets.exceptions.ConnectionClosed as e:
# 		print("A client just disconnected")


start_server = websockets.serve(echo, "localhost", PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
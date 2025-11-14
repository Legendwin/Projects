import requests

api_key = '04fba454b6a95de509eae922a226c190'

city_input = input("Enter city: ")

weather_data = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={city_input}&units=metric&APPID={api_key}")

if weather_data.json()['cod'] == '404':
    print("City not found")
else:
    weather = weather_data.json()['weather'][0]['main']
    temp = round(weather_data.json()['main']['temp'])

    print(f"The weather in {city_input} is {weather}")
    print(f"With a temperature of {temp}°C")
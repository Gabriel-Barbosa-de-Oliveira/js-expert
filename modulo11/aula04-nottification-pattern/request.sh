echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}' #correct!

echo $'\n\n[requesting: invalid age]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 18}' #age incorrect

echo $'\n\n[requesting: invalid name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 80}' #name incorrect

echo $'\n\n[requesting: all invalid name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 18}' #all incorrect

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "V", "age": "0"}' #connection incorrect

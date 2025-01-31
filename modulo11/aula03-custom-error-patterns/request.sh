echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 80}' #correct!

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "Vingador", "age": 18}' #age incorrect

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 18}' #name incorrect

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "V", "age": 18}' #connection incorrect

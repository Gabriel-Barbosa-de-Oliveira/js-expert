FOLDER_AMOUNT=4
for index in $(seq 1 $FOLDER_AMOUNT); do
    #1,2 -> bash01, bash02
    #3,4 -> shell01, shell02
    folder=$([ $index -ge 3 ] && echo bash-0$index || echo shell-0$index)

    echo $folder
done

#!/bin/bash

usage(){
cmdName=`basename $0`
cat << EOF
usage: $cmdName options

This script is used to run another script from a Google Cloud Storage and copy 
back the result to that folder.

OPTIONS:
   -h      Show this message
   -b      GCS bucket
   -d      Directory in the GCS
   -s      Name of the script to be run
   -z      Compress the result using gzip
   -l      Local tmp directory in the GCE VM. By default /localdata   
EOF
wget -qO- "http://localhost:8081/status/FREE"
}

wget -qO- "http://localhost:8081/status/BUSY"

b=""
d=""
s=""
z=0
l="/localdata"

while getopts “hb:d:s:zl:” OPTION
do
     case $OPTION in
         h)
             usage
             exit 1
             ;;
         b)
             b="$OPTARG"
             ;;
         d)
             d="$OPTARG"
             ;;
         s)
             s="$OPTARG"
             ;;
         z)
             z=1
             ;;
         l)
             l="$OPTARG"
             ;;
         ?)
             usage
             exit
             ;;
     esac
done

# Simple usage
if [[ -z "$b" ]] || [[ -z "$d" ]] || [[ -z "$s" ]]
then
    usage    
    exit 1
fi

if [ ! -d "$l" ]
then
    echo "ERROR!!!"
    echo "The local directory $l doesn't exist"
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1
fi

echo "Changing to the local directory $l"
cd "$l"
if [ $? -ne 0 ]
then
    echo "ERROR changing to directory $l"
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1
fi

if [ -e "$d" ]
then
    rm -rfv "$d"
    if [ $? -ne 0 ]
    then
        echo "ERROR removing directory $d"
        wget -qO- "http://localhost:8081/status/FREE"
        exit 1
    fi
fi

echo "Copying files from GCS bucket gs://$b/$d/"
gsutil -m cp -R "gs://$b/$d/" .
if [ $? -ne 0 ]
then
    echo "ERROR!!!"
    echo "Can't copy from GCS bucket gs://$b/$d/"
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1 
fi

cd $d
if [ $? -ne 0 ]
then
    echo "ERROR!!!"
    echo "Can't change to directory $d"
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1 
fi

echo "Deleting status file if exist"
rm -f status

echo "Setting input files"
for a in *
do
   echo "INPUT|$a" >> status
done

echo "Testing the existency of script $s"
if [ ! -e "$s" ]
then
    echo "ERROR!!!" >> status
    echo "The script $s doesn't exist on GCS bucket $b" >> status
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1
fi

echo "Changing the premissions to $s"
chmod a+x "$s" 
if [ $? -ne 0 ]
then
    echo "ERROR!!!" >> status 2>&1
    echo "Can't change the premissions to $s" >> status
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1 
fi

echo "Running $s and send the output to status"
./"$s" >> status 2>&1
if [ $? -ne 0 ]
then
    echo "ERROR!!!" >> status
    echo "Error running the script $s" >> status
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1 
fi

echo "Deleting input files"
grep "^INPUT|" status | awk -F\| '{print $2}' | while read line
do
    rm -rfv "$line" >> status 2>&1
    if [ $? -ne 0 ]
    then
        echo "ERROR!!!" >> status
        echo "Error removing file $line" >> status
        wget -qO- "http://localhost:8081/status/FREE"
        exit 1 
    fi
done

if [ $z -eq 1 ]
then  
    echo "Compressing the new files" 
    find ./ -type f ! -name status -exec gzip -v {} \; >> status 2>&1
    if [ $? -ne 0 ]
    then
        echo "ERROR!!!" >> status
        echo "Error compressing the files" >> status
        wget -qO- "http://localhost:8081/status/FREE"
        exit 1 
    fi 
fi

echo "Copying the results to gs://$b/$d/"
gsutil -m cp -R * gs://$b/$d/
if [ $? -ne 0 ]
then
    echo "ERROR!!!"
    echo "Error copying the files to GCS bucket $b/$d"
    wget -qO- "http://localhost:8081/status/FREE"
    exit 1
fi

cd $l
rm -rfv $d


wget -qO- "http://localhost:8081/status/FREE"
exit 0

<!-- Использования питона для преобразования сообщения коммита -->

#!/bin/sh
python3 - "$1" << 'EOF'
import sys

commit_msg_file = sys.argv[1]

with open(commit_msg_file, 'r', encoding='utf-8') as f:
lines = f.readlines()

if lines: # Process first line: trim, capitalize, remove trailing dots and spaces
first = lines[0].strip()
if first:
first = first[0].upper() + first[1:]
first = first.rstrip('. ')
lines[0] = first + '\n'

    # Trim other lines
    lines[1:] = [line.strip() for line in lines[1:] if line.strip()]

with open(commit_msg_file, 'w', encoding='utf-8') as f:
f.writelines(lines)
EOF

2 вариант

<!-- работает с одной строкой -->

# Удаляет пробелы в начале и конце первой строки, делает первую букву заглавной, удаляет точки и пробелы в конце первой строки.

COMMIT_MSG_FILE=$1

# Read first line

read -r first_line < "$COMMIT_MSG_FILE"

# Trim leading/trailing spaces

first_line=$(printf '%s' "$first_line" | sed 's/^[[:space:]]_//;s/[[:space:]]_$//')

# Uppercase first character

if [ -n "$first_line" ]; then
first_line=$(printf '%s' "$first_line" | awk '{ $1 = toupper(substr($1,1,1)) substr($1,2) }1')
fi

# Remove trailing dots and spaces

first_line=$(printf '%s' "$first_line" | sed 's/[. ]\*$//')

# Write back

printf '%s\n' "$first_line" > "$COMMIT_MSG_FILE"

3 вариант

<!-- форматирует сообщение коммита с несколькоми строками -->

#!/bin/sh

# Удаляет пробелы в начале и конце первой строки, делает первую букву заглавной, удаляет точки и пробелы в конце первой строки.

COMMIT_MSG_FILE=$1

# Read all lines

first_line=$(sed -n '1p' "$COMMIT_MSG_FILE")
rest=$(sed -n '2,$p' "$COMMIT_MSG_FILE")

# Trim leading/trailing spaces

first_line=$(printf '%s' "$first_line" | sed 's/^[[:space:]]_//;s/[[:space:]]_$//')

# Uppercase first character

if [ -n "$first_line" ]; then
first_line=$(printf '%s' "$first_line" | awk '{ $1 = toupper(substr($1,1,1)) substr($1,2) }1')
fi

# Remove trailing dots and spaces

first_line=$(printf '%s' "$first_line" | sed 's/[. ]\*$//')

# Write back

if [ -n "$rest" ]; then
printf '%s\n%s\n' "$first_line" "$rest" > "$COMMIT_MSG_FILE"
else
    printf '%s\n' "$first_line" > "$COMMIT_MSG_FILE"
fi

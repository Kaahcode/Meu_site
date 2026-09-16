if __name__ == '__main__':from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

app = Flask(__name__)
app.secret_key = 'minha chave'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'test'

mysql = MySQL(app)
@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = %s AND password = %s', (username, password))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            return render_template('login.html', msg='Logged in successfully!')
        else:
            msg = 'Incorrect username/password!'
    return render_template("login.html", msg=msg)

@app.route('/logout')
def logout():
         session.pop('loggedin', None)
         session.pop('id', None)
         session.pop('username', None)
         return redirect(url_for('login'))

@app.route('/cadastre', methods=['GET', 'POST'])
def cadastre():

    msg = ''


    if request.method == 'POST':

        # RECEBE OS DADOS DO HTML

        nome = request.form.get(
            'nome'
        )


        sobrenome = request.form.get(
            'sobrenome'
        )


        email = request.form.get(
            'email'
        )


        password = request.form.get(
            'password'
        )


        confirmar_senha = request.form.get(
            'confirmar_senha'
        )


        dia = request.form.get(
            'dia'
        )


        mes = request.form.get(
            'mes'
        )


        ano = request.form.get(
            'ano'
        )


        genero = request.form.get(
            'genero'
        )


        # VERIFICA SE TODOS OS CAMPOS
        # FORAM PREENCHIDOS

        if (
            not nome
            or not sobrenome
            or not email
            or not password
            or not confirmar_senha
            or not dia
            or not mes
            or not ano
            or not genero
        ):

            msg = (
                'Preencha todos os campos!'
            )


        # VERIFICA AS SENHAS

        elif password != confirmar_senha:

            msg = (
                'As senhas não são iguais!'
            )


        # VERIFICA O E-MAIL

        elif not re.match(
            r'[^@]+@[^@]+\.[^@]+',
            email
        ):

            msg = (
                'E-mail inválido!'
            )


        else:

            # JUNTA A DATA

            data_nascimento = (
                f'{ano}-'
                f'{mes.zfill(2)}-'
                f'{dia.zfill(2)}'
            )


            # CONECTA AO MYSQL

            cursor = mysql.connection.cursor(
                MySQLdb.cursors.DictCursor
            )


            # VERIFICA SE O E-MAIL
            # JÁ FOI CADASTRADO

            cursor.execute(
                '''
                SELECT *
                FROM accounts
                WHERE email = %s
                ''',
                (email,)
            )


            account = cursor.fetchone()


            if account:

                msg = (
                    'Este e-mail já está '
                    'cadastrado!'
                )


            else:

                # SALVA OS DADOS

                cursor.execute(
                    '''
                    INSERT INTO accounts
                    (
                        nome,
                        sobrenome,
                        email,
                        password,
                        data_nascimento,
                        genero
                    )

                    VALUES
                    (
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s
                    )
                    ''',
                    (
                        nome,
                        sobrenome,
                        email,
                        password,
                        data_nascimento,
                        genero
                    )
                )


                # CONFIRMA O CADASTRO

                mysql.connection.commit()


                cursor.close()


                # ENVIA PARA O LOGIN

                return redirect(
                    url_for('login')
                )


    return render_template(
        'cadastro-login.html',
        msg=msg
    )


if __name__ == '__main__':
    app.run(debug=True, port=50004)

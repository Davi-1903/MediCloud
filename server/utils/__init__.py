from dotenv import load_dotenv
from os import getenv


load_dotenv()


def get_env(key: str, default: str | None = None) -> str:
    '''
    Carregar variáveis de ambiente, com opção de valor padrão. Se a variável não for encontrada e nenhum valor padrão for fornecido, uma exceção será lançada.

    Params:
        key (str): O nome da variável de ambiente a ser carregada.
        default (str | None): Um valor padrão a ser retornado se a variável de ambiente não for encontrada.
    
    Returns:
        str: O valor da variável de ambiente ou o valor padrão, se fornecido.
    
    Raises:
        ValueError: Se a variável de ambiente não for encontrada e nenhum valor padrão for fornecido.

    Exemplo de uso:

    >>> get_env('DATABASE_URL', 'sqlite:///app.db')
    'sqlite:///app.db'
    >>> get_env('SECRET_KEY')
    Traceback (most recent call last):
        ...
    ValueError: A variável de ambiente "SECRET_KEY" não foi definida ou está vazia
    '''
    
    value = getenv(key)
    if value is not None and value != '':
        return value
    if default is not None:
        return default
    raise ValueError(f'A variável de ambiente "{key}" não foi definida ou está vazia')

<?php
	/**
	 * Clase usada para conectarse a la base de datos 
	 */
	class Database
	{
		private $host;
		private $db;
		private $user;
		private $password;
		
		public function __construct()
		{
			$this->host = 'fdb1030.awardspace.net';
			$this->db = '4286493_dl';
			$this->user = '4286493_dl';
			$this->password = 'Soledad387380YGOP.';
		}
		function connect(){
			try{
				$connection = "mysql:host=".$this->host.";dbname=".$this->db;
				$options = [
					PDO::ATTR_ERRMODE		=>PDO::ERRMODE_EXCEPTION,
					PDO::ATTR_EMULATE_PREPARES	=>false,
				];

				$pdo = new PDO($connection,$this->user,$this->password,$options);

				return $pdo;
			}catch(PDOException $e){
				print_r('Error connection: '.$e->getMessage());
			}
		}
		function getHost(){
			return $this->host;
		}
		function getDb(){
			return $this->db;
		}
		function getUser(){
			return $this->user;
		}
		function getPassword(){
			return $this->password;
		}
	}
?>
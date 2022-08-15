// Server side implementation of UDP client-server model
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netinet/in.h>
	
#define PORT	 8080
#define MAXLINE 1024

uint8_t dataServerKirim[64];
uint8_t dataServerTerima[MAXLINE];

int16_t serverKirimInt = 1234;
float serverKirimFloat = 56.78;
uint8_t serverKirimByte = 112;

int16_t serverTerimaInt;
float serverTerimaFloat;
uint8_t serverTerimaByte;

// Driver code
int main() {
	printf("---------UDP Server---------\n");
	int sockfd;
	char buffer[MAXLINE];
	char *hello = "Data dari server";
	struct sockaddr_in servaddr, cliaddr;
		
	// Creating socket file descriptor
	if ( (sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0 ) {
		perror("socket creation failed");
		exit(EXIT_FAILURE);
	}
		
	memset(&servaddr, 0, sizeof(servaddr));
	memset(&cliaddr, 0, sizeof(cliaddr));
		
	// Filling server information
	servaddr.sin_family = AF_INET; // IPv4
	servaddr.sin_addr.s_addr = INADDR_ANY;
	servaddr.sin_port = htons(PORT);
	inet_aton("127.0.0.1", &servaddr.sin_addr);
		
	// Bind the socket with the server address
	if ( bind(sockfd, (const struct sockaddr *)&servaddr,
			sizeof(servaddr)) < 0 )
	{
		perror("bind failed");
		exit(EXIT_FAILURE);
	}
		
	int len, n;
	
	len = sizeof(cliaddr); //len is value/result
	
	n = recvfrom(sockfd, dataServerTerima, MAXLINE,
				MSG_WAITALL, ( struct sockaddr *) &cliaddr,
				&len);
	
	printf("Menerima Data Dari Client\n");

	memcpy(&serverTerimaInt, dataServerTerima, 2);
	memcpy(&serverTerimaFloat, dataServerTerima + 2, 4);
	memcpy(&serverTerimaByte, dataServerTerima + 6, 1);
	printf("%d,%0.3f,%d\n",serverTerimaInt,serverTerimaFloat,serverTerimaByte);

	//send to client
	// memcpy(dataServerKirim, &serverKirimInt, 2);
	// memcpy(dataServerKirim + 2, &serverKirimFloat, 4);
	// memcpy(dataServerKirim + 6, &serverKirimByte, 1);

	// sendto(sockfd, dataServerKirim, sizeof(dataServerKirim),
	// 	MSG_CONFIRM, (const struct sockaddr *) &cliaddr,
	// 		len);


	// printf("Kirim Ke Client\n");
		
	return 0;
}

// Client side implementation of UDP client-server model
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

char dataClientKirim[64];
uint8_t dataClientTerima[MAXLINE];


int16_t clientKirimInt=1201;
float clientKirimFloat=36.11;
uint8_t clientKirimByte=128;

int16_t clientTerimaInt=0;
float clientTerimaFloat=0;
uint8_t clientTerimaByte=0;

// Driver code
int main() {
	int sockfd;
	char buffer[MAXLINE];
	char *hello = "Data dari client";
	struct sockaddr_in	 servaddr;
	
	// Creating socket file descriptor
	if ( (sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0 ) {
		perror("socket creation failed");
		exit(EXIT_FAILURE);
	}
	
	memset(&servaddr, 0, sizeof(servaddr));
		
	// Filling server information
	servaddr.sin_family = AF_INET;
	servaddr.sin_port = htons(PORT);
	servaddr.sin_addr.s_addr = INADDR_ANY;
	inet_aton("127.0.0.1", &servaddr.sin_addr);
		
	char n, tf;
	int len;
		
	// kirim data
	memcpy(dataClientKirim,&clientKirimInt,2);
	memcpy(dataClientKirim+2,&clientKirimFloat,4);
	memcpy(dataClientKirim+6,&clientKirimByte,1);

	tf = sendto(sockfd, dataClientKirim, sizeof(dataClientKirim),
		MSG_CONFIRM, (const struct sockaddr *) &servaddr,
			sizeof(servaddr));

	// printf("Data Dikirim Ke Server\n");
			
	// n = recvfrom(sockfd, dataClientTerima, MAXLINE,
	// 			MSG_WAITALL, (struct sockaddr *) &servaddr,
	// 			&len);

	// // n = recvfrom(sockfd, (char *)buffer, MAXLINE,
	// // 			MSG_WAITALL, (struct sockaddr *) &servaddr,
	// // 			&len);

	// buffer[n] = '\0';
	// printf("Server : %s\n", buffer);

	// printf("Menerima Data Dari Server\n");
	// memcpy(&clientTerimaInt,dataClientTerima,2);
	// memcpy(&clientTerimaFloat,dataClientTerima+2,4);
	// memcpy(&clientTerimaByte,dataClientTerima+6,1);

	// printf("%d,%.3f,%d\n",clientTerimaInt,clientTerimaFloat,clientTerimaByte);

	
	close(sockfd);
	return 0;
}

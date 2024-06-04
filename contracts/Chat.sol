// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chat {
    // Struct to store user information
    struct User {
        string username;
        uint256 userId; // Unique user ID for registration
    }

    // Struct to store message information
    struct Message {
        string senderUsername;
        string receiverUsername;
        string message;
        uint256 timestamp;
    }

    // Mapping to store users by username
    mapping(string => User) public users;

    // Mapping to store registered usernames
    mapping(string => bool) private registeredUsernames;

    // Array to store all usernames
    string[] private allUsernames;

    // Mapping to store messages between users
    mapping(string => Message[]) private messagesBetweenUsers;

    // Counter for assigning unique user IDs
    uint256 public nextUserId = 1;

    // Events for user registration and message sending
    event UserRegistered(string username, uint256 userId);
    event MessageSent(string indexed senderUsername, string indexed receiverUsername, string message, uint256 timestamp);

    // Function to register a user
    function registerUser(string memory _username) public {
        require(bytes(_username).length > 0, "Username cannot be empty");

        // Check if the username is already taken
        require(!registeredUsernames[_username], "Username already taken");

        // Assign a unique user ID
        uint256 userId = nextUserId++;
        users[_username] = User(_username, userId);
        registeredUsernames[_username] = true;
        allUsernames.push(_username); // Add the username to the array

        emit UserRegistered(_username, userId);
    }

    // Function to send a message from sender to receiver
    function sendMessage(string memory _senderUsername, string memory _receiverUsername, string memory _message) public {
        require(bytes(_senderUsername).length > 0, "Sender username cannot be empty");
        require(bytes(_receiverUsername).length > 0, "Receiver username cannot be empty");
        require(bytes(_message).length > 0, "Message cannot be empty");

        // Ensure the sender is registered
        require(registeredUsernames[_senderUsername], "Sender is not registered");

        // Ensure the receiver is registered
        require(registeredUsernames[_receiverUsername], "Receiver is not registered");

        uint256 timestamp = block.timestamp;
        messagesBetweenUsers[_senderUsername].push(Message(_senderUsername, _receiverUsername, _message, timestamp));
        messagesBetweenUsers[_receiverUsername].push(Message(_senderUsername, _receiverUsername, _message, timestamp));

        emit MessageSent(_senderUsername, _receiverUsername, _message, timestamp);
    }

    // Function to retrieve all messages between two users
    function getMessages(string memory _username1, string memory _username2) public view returns (Message[] memory) {
        require(bytes(_username1).length > 0, "First username cannot be empty");
        require(bytes(_username2).length > 0, "Second username cannot be empty");

        uint256 count1 = messagesBetweenUsers[_username1].length;
        uint256 count2 = messagesBetweenUsers[_username2].length;
        Message[] memory allMessages = new Message[](count1 + count2);

        uint256 index = 0;
        for (uint256 i = 0; i < count1; i++) {
            if (keccak256(abi.encodePacked(messagesBetweenUsers[_username1][i].receiverUsername)) == keccak256(abi.encodePacked(_username2))) {
                allMessages[index++] = messagesBetweenUsers[_username1][i];
            }
        }

        for (uint256 i = 0; i < count2; i++) {
            if (keccak256(abi.encodePacked(messagesBetweenUsers[_username2][i].receiverUsername)) == keccak256(abi.encodePacked(_username1))) {
                allMessages[index++] = messagesBetweenUsers[_username2][i];
            }
        }

        // Sort messages by timestamp
        for (uint256 i = 0; i < index - 1; i++) {
            for (uint256 j = i + 1; j < index; j++) {
                if (allMessages[i].timestamp > allMessages[j].timestamp) {
                    Message memory temp = allMessages[i];
                    allMessages[i] = allMessages[j];
                    allMessages[j] = temp;
                }
            }
        }

        // Adjust the size of the array to the actual number of messages
        Message[] memory resultMessages = new Message[](index);
        for (uint256 i = 0; i < index; i++) {
            resultMessages[i] = allMessages[i];
        }

        return resultMessages;
    }

    // Function to retrieve all registered usernames
    function getAllUsernames() public view returns (string[] memory) {
        return allUsernames;
    }
}

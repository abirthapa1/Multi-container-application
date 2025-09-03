terraform {
  required_version = ">=0.15.0, < 2.0.0"
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~>4.0"
    }
  }
}


data "aws_ssm_parameter" "todo_list_ami" {
  name = "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64"
}

resource "aws_security_group" "todo_list_SG" {
    name = "Tod List SG"
    description = "Allow HTTP traffic"

    ingress {
        from_port = 80
        to_port = 80
        protocol = "TCP"
        cidr_blocks = [ "0.0.0.0/0" ]
    }

    ingress {
        from_port = 22
        to_port = 22
        protocol = "TCP"
        cidr_blocks = [ "0.0.0.0/0" ]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = [ "0.0.0.0/0" ]
    }
}

resource "aws_key_pair" "todo_list_keypair" {
  key_name = "todo_list"
  public_key = file(var.ssh_key_public)
}

resource "aws_instance" "todo_list" {
    ami = data.aws_ssm_parameter.todo_list_ami.value
    instance_type = "t2.micro"

    tags = {
      Name = "todo_list"
    }

    key_name = aws_key_pair.todo_list_keypair.key_name
    associate_public_ip_address = true

    #security group configuration
    vpc_security_group_ids = [ aws_security_group.todo_list_SG.id ]

    # connection {
    #   type = "ssh"
    #   user = "ec2-user"
    #   private_key = file(var.ssh_key_private)
    #   host = self.public_ip
    # }
    # provisioner "remote-exec" {
    #   inline = [ 
    #     "sudo yum update -y && sudo amazon-linux-extras install ansible2 -y",
    #     "sleep 60s"
    #    ]
    # }
}
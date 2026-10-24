export const initialCourses = [
  {
    title: 'Ethical Hacking Nerd',
    slug: 'ethical-hacking-nerd',
    code: 'C-EHN',
    price: 22000,
    currency: 'INR',
    gstInfo: '+ GST',
    shortDescription: 'An introductory cybersecurity programme for school and college students interested in ethical hacking and responsible security practices.',
    fullDescription: 'Embark on your cybersecurity journey with our entry level Hacking course that introduces fundamental concepts, tools, and techniques essential for understanding and practicing ethical hacking in today\'s digital landscape. Built specifically for high school and college students passionate about learning practical security skills in an authorized, legal lab environment.',
    features: [
      '35+ hours of live instructor-led training',
      'Practical hands-on exercises in controlled labs',
      'Real-time practical assignments',
      'Certificate of course completion',
      'Doubt resolution & mentorship sessions'
    ],
    duration: '35+ Hours Live Training',
    targetAudience: 'High school & college students, beginners passionate about ethical hacking',
    prerequisites: [
      'No formal prerequisite required',
      'Basic knowledge of computer operations and networking is beneficial',
      'All dual-use tools presented exclusively in lawful, authorized lab environments'
    ],
    syllabus: [
      {
        category: 'Foundations & Reconnaissance',
        topics: [
          'Introduction to ethical hacking & legal frameworks',
          'Networking basics (TCP/IP, OSI, IP Addressing)',
          'Kali Linux basics & command line mastery',
          'Information gathering & passive footprinting',
          'Port scanning and network scanning'
        ]
      },
      {
        category: 'Vulnerability Analysis & Exploitation',
        topics: [
          'Vulnerability identification and assessment',
          'Introduction to Metasploit Framework',
          'Windows security testing using Metasploit',
          'Password security and password cracking techniques',
          'Privilege escalation fundamentals',
          'Backdoor concepts in controlled training labs'
        ]
      },
      {
        category: 'Network & System Defense',
        topics: [
          'Network sniffing and packet analysis with Wireshark',
          'Man-in-the-middle (MITM) attacks and prevention',
          'Denial-of-service (DoS/DDoS) concepts & mitigation',
          'Firewall configuration and access control',
          'Intrusion detection systems (IDS/IPS)'
        ]
      },
      {
        category: 'Web, Wireless & Advanced Awareness',
        topics: [
          'Web server security fundamentals',
          'Web application attacks overview (SQLi, XSS)',
          'Wi-Fi security testing and WPA2/3 encryption',
          'Mobile security essentials',
          'Cryptography basics and data encryption',
          'Steganography & hidden data analysis',
          'Social engineering tactics & human element defenses',
          'Deep web and dark web awareness using Tor'
        ]
      }
    ],
    activeStatus: true,
    sortOrder: 1
  },
  {
    title: 'Penetration Testing Nerd',
    slug: 'penetration-testing-nerd',
    code: 'C-PTN',
    price: 75000,
    currency: 'INR',
    gstInfo: '+ GST',
    shortDescription: 'A practical cybersecurity programme designed for individuals interested in security assessments, identifying vulnerabilities, and developing penetration testing skills.',
    fullDescription: 'Unlock advanced skills in security assessment through our comprehensive, industry-recognized course. Gain extensive hands-on experience in identifying and mitigating complex security vulnerabilities across networks, web applications, and mobile environments. Designed to turn aspiring learners into job-ready professional penetration testers.',
    features: [
      '120+ hours of comprehensive live training',
      'Extensive hands-on exercises in real-world simulated labs',
      'Real-time industrial projects and vulnerability reporting',
      'Dedicated placement assistance & referral network',
      '1-on-1 career guidance & technical interview preparation',
      'Industry-recognized job-oriented training syllabus'
    ],
    duration: '120+ Hours Live Training',
    targetAudience: 'Aspiring penetration testers, IT graduates, system administrators, security enthusiasts',
    prerequisites: [
      'No strict formal prerequisite required',
      'Fundamental understanding of networking basics is a plus',
      'Commitment to hands-on lab practice'
    ],
    syllabus: [
      {
        category: 'Introduction to Cybersecurity',
        topics: [
          'Introduction to modern cybersecurity landscape',
          'Cybersecurity fundamentals & defensive architecture',
          'The CIA Triad (Confidentiality, Integrity, Availability)',
          'Applied cryptography (symmetric, asymmetric, hashing)',
          'Taxonomy of modern cyber threats and attack vectors'
        ]
      },
      {
        category: 'Networking Basics for Pentesters',
        topics: [
          'Networking models (OSI 7 layers & TCP/IP stack)',
          'Protocols deep dive (DNS, HTTP/S, SSH, FTP, SMB)',
          'Networking devices, routers, switches, and firewalls',
          'IP addressing, CIDR, and subnetting calculations'
        ]
      },
      {
        category: 'Network Penetration Testing',
        topics: [
          'Information gathering, OSINT, and active reconnaissance',
          'Network mapping with Nmap and advanced NSE scripts',
          'Vulnerability scanning and assessment (Nessus, OpenVAS)',
          'Exploiting network services and unpatched daemons',
          'Post-exploitation, pivoting, and lateral movement'
        ]
      },
      {
        category: 'Reporting & Project Handling',
        topics: [
          'Professional penetration test report creation',
          'CVSS v3.1 severity rating calculation & impact scoring',
          'Proof-of-concept (PoC) documentation and remediation guidance',
          'Client debriefing and executive summary formulation'
        ]
      },
      {
        category: 'Web Application Penetration Testing',
        topics: [
          'Web application security fundamentals and protocols',
          'Web technologies, REST APIs, and application architecture',
          'Intercepting proxies: mastering Burp Suite Professional',
          'OWASP Top 10 vulnerabilities in depth',
          'Web application reconnaissance and footprinting',
          'Web vulnerability scanners and manual verification',
          'Injection attacks (SQL Injection, Command Injection, LDAP)',
          'File-handling and path traversal vulnerabilities (LFI/RFI)',
          'Authentication, OAuth, and authorization bypasses (IDOR)',
          'Session management vulnerabilities and CSRF',
          'Security misconfigurations & CORS vulnerabilities',
          'Data and input validation, XSS, and SSRF',
          'Hands-on pentesting of deliberately vulnerable web applications'
        ]
      },
      {
        category: 'Mobile Application Penetration Testing',
        topics: [
          'Introduction to mobile application security architecture',
          'Android & iOS platform internals and sandboxing',
          'Mobile application reconnaissance and APK decompilation',
          'Static Application Security Testing (SAST) for mobile apps',
          'Dynamic Application Security Testing (DAST) using Frida and objection'
        ]
      }
    ],
    activeStatus: true,
    sortOrder: 2
  },
  {
    title: 'Web Application Security Nerd',
    slug: 'web-application-security-nerd',
    code: 'C-WASN',
    price: 75000,
    currency: 'INR',
    gstInfo: '+ GST',
    shortDescription: 'Best suited for securing modern web applications against common attacks.',
    fullDescription: 'Master the art of auditing, defending, and breaking modern web applications. From complex Single Page Applications (SPAs) and GraphQL/REST APIs to microservice security architectures, this specialized program equips you to pinpoint critical business logic flaws and vulnerabilities before malicious actors do.',
    features: [
      'Deep dive into OWASP Top 10 & API Security Top 10',
      'Burp Suite Pro advanced extensions & automation',
      'Modern API testing (REST, GraphQL, WebSocket)',
      'Source code review & remediation guidance',
      'Live vulnerability lab environments',
      'Placement support & mock interviews'
    ],
    duration: '80+ Hours Live Training',
    targetAudience: 'Web developers, QA engineers, application security engineers, security researchers',
    prerequisites: [
      'Basic knowledge of web development (HTML, JS, HTTP methods)',
      'Familiarity with web browser developer tools'
    ],
    syllabus: [
      {
        category: 'Modern Web Architecture & Threat Modeling',
        topics: [
          'Client-server models, HTTP/2 & HTTP/3 protocols',
          'Threat modeling for web applications (STRIDE)',
          'Authentication schemes (JWT, SAML, OAuth 2.0)'
        ]
      },
      {
        category: 'OWASP Top 10 & API Security',
        topics: [
          'Broken Object Level Authorization (BOLA/IDOR)',
          'Server-Side Request Forgery (SSRF) in cloud environments',
          'Cross-Site Scripting (Reflected, Stored, DOM-based)',
          'SQLi, NoSQLi, and GraphQL Injection attacks'
        ]
      },
      {
        category: 'Business Logic & Remediation',
        topics: [
          'Race conditions and concurrency flaws',
          'Payment gateway bypasses & workflow manipulation',
          'Secure coding practices and automated SAST/DAST pipelines'
        ]
      }
    ],
    activeStatus: true,
    sortOrder: 3
  },
  {
    title: 'Cloud Security Nerd',
    slug: 'cloud-security-nerd',
    code: 'C-CSN',
    price: 75000,
    currency: 'INR',
    gstInfo: '+ GST',
    shortDescription: 'Recommended for securing cloud infrastructure and sensitive data.',
    fullDescription: 'Securing cloud infrastructure has become one of the highest-paying cybersecurity disciplines worldwide. This course covers cloud security architecture, IAM policy misconfigurations, CSPM (Cloud Security Posture Management), container hardening, and automated compliance across AWS, Azure, and Google Cloud Platform.',
    features: [
      'Multi-cloud security posture management (AWS & Azure)',
      'IAM policies, least-privilege models & credential defense',
      'Kubernetes & Docker container security testing',
      'Cloud compliance (CIS Benchmarks, ISO 27017)',
      'Hands-on cloud exploitation and defense labs'
    ],
    duration: '90+ Hours Live Training',
    targetAudience: 'Cloud engineers, DevOps professionals, sysadmins, cloud architects, security analysts',
    prerequisites: [
      'Basic understanding of cloud concepts and Linux administration',
      'Foundational networking concepts'
    ],
    syllabus: [
      {
        category: 'Cloud Fundamentals & Shared Responsibility',
        topics: [
          'Cloud service models (IaaS, PaaS, SaaS)',
          'Shared responsibility model in practice',
          'Cloud threat landscape and adversary techniques'
        ]
      },
      {
        category: 'Identity & Access Management (IAM)',
        topics: [
          'IAM permissions, roles, and privilege escalation vectors',
          'Access keys, STS tokens, and metadata service abuse (IMDSv1 vs IMDSv2)',
          'Auditing cloud configurations with open source tools'
        ]
      },
      {
        category: 'Containers & Cloud Native Security',
        topics: [
          'Docker daemon security and image vulnerability scanning',
          'Kubernetes RBAC, network policies, and pod security standards',
          'Infrastructure as Code (IaC) security scanning'
        ]
      }
    ],
    activeStatus: true,
    sortOrder: 4
  },
  {
    title: 'SOC Analysis Nerd',
    slug: 'soc-analysis-nerd',
    code: 'C-SAN',
    price: 75000,
    currency: 'INR',
    gstInfo: '+ GST',
    shortDescription: 'Perfect for professionals focused on real-time threat detection and response.',
    fullDescription: 'Begin your career in frontline cyber defense with our high-demand SOC Analyst Certification Program. Learn essential skills to monitor enterprise networks, analyze suspicious security events, formulate incident response plans, and neutralize cyber threats using real-world SIEM platforms.',
    features: [
      'Hands-on SIEM monitoring using Splunk & ELK Stack',
      'NIST & SANS Incident Response lifecycle drills',
      'Log analysis for Windows Event IDs & Linux Syslog',
      'Cyber Threat Intelligence (CTI) & MITRE ATT&CK framework',
      'Dedicated placement assistance & SOC shift simulations'
    ],
    duration: '100+ Hours Live Training',
    targetAudience: 'Fresh graduates, IT support specialists, network engineers, aspiring Blue Team defenders',
    prerequisites: [
      'Basic networking concepts (TCP/IP, Ports, DNS)',
      'Interest in defensive security and log analysis'
    ],
    syllabus: [
      {
        category: 'SOC Architecture & Threat Landscape',
        topics: [
          'Role of Tier 1, 2, and 3 SOC analysts',
          'Security operations workflows and ticket triage',
          'Cyber Kill Chain and MITRE ATT&CK matrix'
        ]
      },
      {
        category: 'SIEM & Log Analysis',
        topics: [
          'Introduction to SIEM architecture and log forwarding',
          'Splunk search processing language (SPL) and dashboards',
          'Windows Security Event logs analysis (Logon, Process Creation)',
          'Network traffic analysis with Zeek and Suricata'
        ]
      },
      {
        category: 'Incident Response & Threat Hunting',
        topics: [
          'Phishing email analysis and header inspection',
          'Malware analysis fundamentals and sandbox execution',
          'Writing detection rules with Sigma and YARA',
          'Incident reporting and post-incident review'
        ]
      }
    ],
    activeStatus: true,
    sortOrder: 5
  }
];

export const initialTestimonials = [
  {
    learnerName: 'Kavin M',
    designation: 'Security Engineer',
    organization: 'Exor India',
    location: 'India',
    approvedQuotation: 'Enrolling in NERDS LAB was one of the best decisions I\'ve made for my career. The online training options allowed me to balance my schedule effectively, while the placement assistance ensured that I found a job that aligned perfectly with my skills and interests. Thank you, NERDS LAB, for helping me achieve my professional goals!',
    rating: 5,
    approvalStatus: true,
    displayOrder: 1
  },
  {
    learnerName: 'Vidya Sagar',
    designation: 'Security Engineer',
    organization: 'AAA Technologies',
    location: 'India',
    approvedQuotation: 'NERDS LAB provided me with hands-on practical training that was invaluable in my journey to becoming a cybersecurity professional. The instructors were incredibly knowledgeable, and the live project experience gave me the confidence I needed to succeed in the field.',
    rating: 5,
    approvalStatus: true,
    displayOrder: 2
  },
  {
    learnerName: 'Kavin S',
    designation: 'Security Engineer',
    organization: 'Qaudit',
    location: 'India',
    approvedQuotation: 'I couldn\'t have asked for a better training experience than what I received at NERDS LAB. The expert guidance, comprehensive career support, and interview preparation sessions were instrumental in helping me secure a rewarding job in cybersecurity. I highly recommend NERDS LAB to anyone looking to kickstart their career in this dynamic industry.',
    rating: 5,
    approvalStatus: true,
    displayOrder: 3
  },
  {
    learnerName: 'Mohan Raj GP',
    designation: 'IS Audit Trainee',
    organization: 'Qadit Systems & Solutions Pvt. Ltd',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'The mentors at Nerds Lab made complex topics easy to understand. They helped me build a strong portfolio and guided me through interviews. With their placement help, I landed a job even before completing the course!',
    rating: 5,
    approvalStatus: true,
    displayOrder: 4
  },
  {
    learnerName: 'Kalaiselvan S',
    designation: 'Assistant System Engineer',
    organization: 'Tata Consultancy Services (TCS)',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'As a fresh graduate, I was unsure about how to get started in the cybersecurity field. The course at Nerds Lab was practical, and the trainers were really supportive. The placement team helped me get my first job as a Security Analyst. I’m grateful for the opportunity!',
    rating: 5,
    approvalStatus: true,
    displayOrder: 5
  },
  {
    learnerName: 'Saravanan S',
    designation: 'Security Engineer',
    organization: 'Vault Infosec',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'I came from an Administration background with no coding knowledge. I joined Nerds Lab with interest in cybersecurity, and the trainers helped me understand every concept from scratch. The hands-on labs, doubt sessions, and placement support helped me transition into a new career as a Security Engineer. If I can do it, anyone can!',
    rating: 5,
    approvalStatus: true,
    displayOrder: 6
  },
  {
    learnerName: 'Subash M',
    designation: 'IS Audit Trainee',
    organization: 'Qadit Systems & Solutions Pvt. Ltd',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'I was working in a tech support role and felt stuck. Nerds Lab gave me the push I needed to move into cybersecurity. The course was practical and beginner-friendly, and the mentors were very supportive. With their placement assistance, I got a role in a cybersecurity team. Now I’m finally working in the domain I’m passionate about!',
    rating: 5,
    approvalStatus: true,
    displayOrder: 7
  },
  {
    learnerName: 'Shankar Ram S',
    designation: 'Banking Domain Security',
    organization: 'AAA Technologies',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'After a long career break and coming from a non-coding background, I was hesitant to start something technical. But Nerds Lab made the learning process easy and step-by-step. The internship gave me real exposure, and the placement team helped me get hired as a Security Trainee. Truly thankful for this life-changing shift!',
    rating: 5,
    approvalStatus: true,
    displayOrder: 8
  },
  {
    learnerName: 'Parthasarathi B',
    designation: 'Security Engineer',
    organization: 'Cybernerds Solutions',
    location: 'Thanjavur, Tamil Nadu',
    approvedQuotation: 'Joining NERDS LAB was a turning point in my professional journey. Their flexible online classes made learning convenient, and the trainers explained every concept with real-time examples. The placement support team guided me throughout the interview process, which helped me secure a role that truly matches my profile. I’m grateful to NERDS LAB for shaping my future.',
    rating: 5,
    approvalStatus: true,
    displayOrder: 9
  },
  {
    learnerName: 'Hariharan V',
    designation: 'Security Engineer',
    organization: 'Cybernerds Solutions',
    location: 'Thanjavur, Tamil Nadu',
    approvedQuotation: 'I had an excellent learning experience with NERDS LAB. The online sessions were well-structured and easy to follow, even with my busy routine. What impressed me most was their dedicated placement assistance, which gave me confidence and multiple job opportunities. Thanks to NERDS LAB, I am now working in a position I always aimed for.',
    rating: 5,
    approvalStatus: true,
    displayOrder: 10
  },
  {
    learnerName: 'Bharathwaj MA',
    designation: 'Security Engineer',
    organization: 'Cybernerds Solutions',
    location: 'Thanjavur, Tamil Nadu',
    approvedQuotation: 'Choosing NERDS LAB for my training was one of the smartest decisions of my career. The faculty members were knowledgeable, supportive, and always available to clear doubts. Their online learning model was highly convenient, and the placement team worked tirelessly to connect me with the right employers. I sincerely thank NERDS LAB for this wonderful support.',
    rating: 5,
    approvalStatus: true,
    displayOrder: 11
  },
  {
    learnerName: 'Abishkar S',
    designation: 'Security Engineer',
    organization: 'Snergy Systems & Solutions',
    location: 'Haryana',
    approvedQuotation: 'My journey with NERDS LAB has been truly rewarding. The course content was industry-focused, and the online classes helped me learn without disturbing my work schedule. Their placement assistance was exceptional, providing interview preparation and career guidance at every step. I’m happy to say that I landed a great job because of their efforts.',
    rating: 5,
    approvalStatus: true,
    displayOrder: 12
  }
];

export const initialFAQs = [
  {
    category: 'COURSES',
    question: 'What courses do you offer in cybersecurity?',
    answer:
      'We offer an extensive range of specialized cybersecurity programs including Certified Ethical Hacker (CEH), SOC Analyst (Tier 1 & 2), Web Application Penetration Testing (WAPT), Cloud Security Architecture (AWS & Azure), and Digital Forensics & Incident Response (DFIR).',
    activeStatus: true,
    displayOrder: 1,
  },
  {
    category: 'ELIGIBILITY',
    question: 'Who can join the NERDS LAB cybersecurity programmes?',
    answer:
      'Our curriculums cater to students, college graduates, career-switchers, IT professionals, and security enthusiasts. Modules begin with networking and Linux fundamentals before advancing to offensive penetration testing.',
    activeStatus: true,
    displayOrder: 2,
  },
  {
    category: 'PRACTICAL LABS',
    question: 'How are the hands-on practical labs structured?',
    answer:
      'Training is 100% practical. Learners receive dedicated virtual cyber range access to exploit real-world vulnerabilities, analyze packet captures with Wireshark, simulate privilege escalations, and practice defense in safe legal sandboxes.',
    activeStatus: true,
    displayOrder: 3,
  },
  {
    category: 'CERTIFICATION',
    question: 'Will I receive an industry-recognized credential?',
    answer:
      'Yes. Upon passing practical lab assessments and final capstones, learners receive an official verifiable NERDS LAB certification confirming hands-on competence, along with preparation guidance for CompTIA Security+, CEH, and OSCP.',
    activeStatus: true,
    displayOrder: 4,
  },
  {
    category: 'INSTRUCTORS',
    question: 'How experienced are your instructors and mentors?',
    answer:
      'Our instructors are seasoned cybersecurity practitioners, red teamers, and SOC analysts with 8+ years of active enterprise security experience. They bring real-world breach response insights and defensive strategies to every class.',
    activeStatus: true,
    displayOrder: 5,
  },
  {
    category: 'MODES & TIMINGS',
    question: 'What training formats and batch timings are available?',
    answer:
      'We offer both on-campus batches at our Thanjavur academy and live interactive online cohorts. Flexible morning, evening, and weekend batches are available to accommodate working professionals and university students.',
    activeStatus: true,
    displayOrder: 6,
  },
  {
    category: 'CAREER SUPPORT',
    question: 'Does NERDS LAB provide placement and career guidance?',
    answer:
      'Yes. Our dedicated career services include 1-on-1 resume engineering, technical mock interview drill-downs, GitHub / lab portfolio reviews, and direct placement opportunities across partner cybersecurity firms.',
    activeStatus: true,
    displayOrder: 7,
  },
  {
    category: 'PREREQUISITES',
    question: 'Do I need prior coding or hacking experience to start?',
    answer:
      'No prior programming or hacking experience is required. Our foundational modules build up all necessary networking, command line, Bash scripting, and Python fundamentals from scratch.',
    activeStatus: true,
    displayOrder: 8,
  },
  {
    category: 'LAB ACCESS',
    question: 'Do I get access to the virtual cyber labs after training hours?',
    answer:
      'Yes! Learners enjoy 24/7 cloud cyber range access throughout their enrollment, allowing you to practice exploitation labs, CTF challenges, and forensic analysis at your own pace.',
    activeStatus: true,
    displayOrder: 9,
  },
  {
    category: 'ADMISSIONS',
    question: 'Can I attend a free demo session before enrolling?',
    answer:
      'Absolutely! We conduct live interactive demo sessions where you can meet mentors, tour the virtual lab environment, review the syllabus, and ask individual career questions before committing.',
    activeStatus: true,
    displayOrder: 10,
  },
];

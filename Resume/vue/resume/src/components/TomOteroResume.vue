<script setup lang="ts"></script>

<template class="Resume">
  <h1>Tom Otero</h1>
  <p>
    Los Angeles, CA · tomotero1984@gmail.com · (503) 927‑0633 ·
    linkedin.com/in/tomotero1984
  </p>

  <div class="section">
    <h2>SENIOR SOFTWARE ENGINEER</h2>
    <p class="summary">
      Engineer with experience in software systems design, embedded Linux, and
      DevOps automation for real-world platforms. My background ranges from
      running integration tests for new hardware and drivers in autonomous
      vehicles to orchestrating high-complexity build systems for large-scale AI
      frameworks. I thrive in roles that prioritize first-principles thinking,
      deterministic and reproducible systems, and domain-agnostic problem
      solving.
    </p>
  </div>

  <div class="section">
    <h2>Experience</h2>

    <div class="title-line">
      <h3>Google (via Yoh) — Senior Build & CI/CD Engineer (2025–Present)</h3>
      <span class="location">Los Angeles, CA</span>
    </div>
    <ul>
      <li>
        Architected and implemented the primary recursive superbuild framework
        for LiteRT-LM using CMake, successfully decoupling the project from its
        Bazel-centric origins to enable portable, cross-platform distribution.
      </li>
      <li>
        Engineered a modular orchestration layer to manage a high-complexity
        dependency graph (including Abseil, Protobuf, Flatbuffers, and
        SentencePiece), ensuring hermetic build lifecycles independent of host
        environments.
      </li>
      <li>
        Developed a sophisticated re-integration strategy utilizing aggregate
        targets and root shims to resolve systemic version conflicts and symbol
        collisions across disparate Google-internal libraries.
      </li>
      <li>
        Authored custom patcher and shim modules to perform build-time surgery,
        ensuring deterministic linking across diverse hardware backends,
        including Android (NPU/GPU), Linux, macOS, and Windows.
      </li>
      <li>
        Established systemic architectural standards and reusable CMake modules
        to maintain the conceptual integrity of the LiteRT-LM runtime as it
        scales for new AI primitives and hardware acceleration backends.
      </li>
    </ul>

    <div class="title-line">
      <h3>Rockstar Games — Associate Build & Release Engineer (2022–2025)</h3>
      <span class="location">Manhattan, NY</span>
    </div>
    <ul>
      <li>
        Modernized legacy frontend asset delivery by building custom MSBuild
        tasks to compile SASS, inject CDN-backed paths via dependency injection,
        and deploy bundles to Akamai using a modular Python + MSBuild toolchain.
        This enabled resilient, environment-specific builds across staging,
        development, and production.
      </li>
      <li>
        Migrated deployment automation from internal repo scripts to modular
        Python packages published via pip, improving reproducibility,
        maintainability, and version control across environments.
      </li>
      <li>
        Established a cross-platform SSH tunnel between isolated,
        security-hardened networks, enabling artifact delivery between TeamCity
        and Windows Server.
      </li>
      <li>
        Reduced build overhead and improved scalability by containerizing legacy
        services with Docker and Compose, laying groundwork for future
        orchestration.
      </li>
      <li>
        Authored detailed internal documentation covering pipelines, build
        workflows, and troubleshooting processes used for onboarding and
        production incident response.
      </li>
      <li>
        Coordinated production deployment troubleshooting with developers,
        leads, and NOC, ensuring minimal service disruption while maintaining
        communication discipline with stakeholders.
      </li>
      <li>
        Supported Agile teams operating in a 3-week sprint cycle, contributing
        to planning, retrospectives, and backlog grooming.
      </li>
    </ul>

    <div class="title-line">
      <h3>
        Cruise (via Novus Labs) — Embedded Linux Test Engineer (2020–2022)
      </h3>
      <span class="location">San Francisco, CA (Remote)</span>
    </div>
    <ul>
      <li>
        Developed automation for hardware-in-the-loop (HIL) testbeds to validate
        embedded Linux drivers used in autonomous vehicle platforms.
      </li>
      <li>
        Integrated Jenkins and Buildkite CI/CD pipelines with HIL testbeds,
        enabling automated validation of drivers across distributed lab
        hardware.
      </li>
      <li>
        Maintained CI/CD pipelines using Jenkins, Buildkite, and JFrog
        Artifactory to coordinate reproducible embedded Linux driver builds,
        track artifacts, and deploy test runs across HIL infrastructure.
      </li>
      <li>
        Engineered hardware test validation into Git feature branch merge
        requests using custom webhooks and worker services, triggering real-time
        HIL jobs across embedded devices.
      </li>
      <li>
        Developed Python-based Pytest automation to validate driver features and
        edge cases, integrating APIs, writing custom wrappers, and stimulating
        systems via external lab hardware.
      </li>
      <li>
        Investigated and triaged C/C++ driver failures in collaboration with
        Cruise developers using serial logs, dmesg, Pytest traces, and
        synchronized debugging across distributed testbeds.
      </li>
    </ul>

    <div class="title-line">
      <h3>Novus Labs — Mechanical Engineer (2018–2022)</h3>
      <span class="location">Hillsboro, OR</span>
    </div>
    <ul>
      <li>
        Collaborated with RF and electrical engineers to architect a distributed
        testbed for Amazon Alexa, using RF chambers, programmable attenuators,
        noise generators, and power cycling to simulate real-world interference
        and signal loss scenarios in compliance with RTCA DO‑160G Section 20.
      </li>
      <li>
        Unified disparate device protocols into a test automation framework,
        coordinating Telnet-controlled power supplies, SSH-managed attenuators,
        USB-based CLI interfaces, and Ellisys Bluetooth sniffers.
      </li>
      <li>
        Coordinated timing in a distributed ATmega sensor and logging system
        using an NTP-aligned controller and custom synchronization protocol.
      </li>
      <li>
        Developed an automated A/V latency validation testbed for smart
        speakers, integrating a Raspberry Pi–based TTS module (Google API,
        ffmpeg, sox), light sensors, and servo-triggered actuators to replace
        manual input and validate command-response timing.
      </li>
    </ul>
  </div>

  <div class="section">
    <h2>Education</h2>
    <div class="title-line">
      <h3>
        Portland State University — B.S., Mechanical Engineering (2015–2019)
      </h3>
    </div>
    <ul>
      <li>Focused on machine design, control theory, and robotics.</li>
      <li>
        Completed projects in system modeling, feedback control, and inverse
        kinematics, including programming the path planning and inverse
        kinematics logic for a 6DOF robotic arm capable of writing letters in 3D
        space.
      </li>
      <li>
        Coursework included PID controller design, Kalman filters, and filter
        design in both digital and continuous domains using MATLAB and op-amp
        circuits.
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-size: 32px;
  border-bottom: 0px;
  padding-bottom: 0px;
  margin: 0px;
  text-align: center;
}
.contact {
  margin: 0px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
.address {
  margin: 0;
  padding: 0;
  border: 0;
  font-style: italic;
  color: #888;
  text-align: center;
}
.line {
  border-top: 0;
  border-bottom: 2px solid #ddd;
}
h2 {
  font-size: 22px;
  color: #444;
  margin-top: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

ul {
  padding-left: 20px;
  margin-top: 10px;
}
li {
  margin-bottom: 8px;
}
.section {
  margin-bottom: 30px;
}
.subhead {
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
}
.date-loc {
  font-size: 13px;
  color: #888;
}
.project-title {
  font-weight: bold;
  margin-top: 15px;
}
pre {
  white-space: pre-wrap;
  font-family: inherit;
}
</style>

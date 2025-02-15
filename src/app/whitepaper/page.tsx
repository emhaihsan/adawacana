import React from "react";
import Link from "next/link";

function WhitepaperNavbar() {
  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              AdaWacana
            </span>
          </Link>
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <WhitepaperNavbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
              AdaWacana Whitepaper
            </h1>
            <p className="text-purple-200">
              Version: 0.1.0 | February 15, 2025
            </p>
          </div>

          {/* Content */}
          <section className="space-y-12">
            {/* Executive Summary */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                1. Executive Summary
              </h2>
              <p className="text-gray-300 leading-relaxed">
                AdaWacana is a Web3 commitment platform that transforms personal
                failures into positive social impact. Utilizing ETH staking,
                transparent smart contracts, and automatic donation mechanisms,
                AdaWacana drives accountability while supporting charitable
                organizations. The platform integrates blockchain technology,
                gamification, and token economics to create a mutually
                beneficial ecosystem.
              </p>
            </div>

            {/* Introduction */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                2. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                In the modern world, many individuals struggle to follow through
                on personal resolutions. Traditional charity systems often lack
                transparency, eroding public trust. AdaWacana addresses these
                issues by converting personal failures into socially
                constructive actions through blockchain technology.
              </p>
            </div>

            {/* The Problem */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                3. The Problem
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Lack of accountability leading to unmet commitments</li>
                <li>
                  Personal failures resulting in negative psychological impacts
                </li>
                <li>
                  Opaque donation processes that limit trust in charity work
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                4. The AdaWacana Solution
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  AdaWacana offers a comprehensive solution:
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">
                      Commitment Creation & Staking
                    </h3>
                    <p>
                      Users set measurable resolutions, stake ETH as a
                      commitment, and select trusted verifiers to ensure
                      accountability.
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">
                      Smart Verification System
                    </h3>
                    <p>
                      A decentralized verification process ensures fairness and
                      transparency, with rewards for active verifiers.
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">
                      Automated Charity Distribution
                    </h3>
                    <p>
                      Failed commitments trigger automatic ETH donations to
                      pre-selected charitable organizations.
                    </p>
                  </div>
                  <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">
                      Analytics & Progress Tracking
                    </h3>
                    <p>
                      A comprehensive dashboard provides insights on success
                      rates and donation transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Architecture */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                5. Technical Architecture
              </h2>
              <p className="text-gray-300 leading-relaxed">
                AdaWacana leverages robust Web3 technology. Smart
                contracts—built in Solidity and deployed via Foundry on the
                Manta Network—manage commitments, stakes, and donations. The
                frontend, developed with Next.js and TailwindCSS, offers a
                modern, responsive user interface, complemented by seamless
                wallet integration via RainbowKit and Wagmi.
              </p>
            </div>

            {/* Platform Economics */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                6. Platform Economics
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The platform will eventually introduce the AdaWacana token to
                support its internal economy, facilitate governance, and provide
                incentives. Revenue streams include a nominal platform fee,
                premium feature subscriptions, and strategic partnerships with
                charity organizations.
              </p>
            </div>

            {/* Development Phases */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                7. Development Phases
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <h3 className="text-xl font-semibold text-purple-400">
                    Phase 1 - MVP
                  </h3>
                  <p className="text-gray-300">
                    Launch commitment creation and donation automation
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <h3 className="text-xl font-semibold text-purple-400">
                    Phase 2 - Crowdfunding
                  </h3>
                  <p className="text-gray-300">
                    Expand charity options through crowdfunding features
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <h3 className="text-xl font-semibold text-purple-400">
                    Phase 3 - NFT Rewards
                  </h3>
                  <p className="text-gray-300">
                    Implement NFT-based achievement system
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <h3 className="text-xl font-semibold text-purple-400">
                    Phase 4 - Token Launch
                  </h3>
                  <p className="text-gray-300">
                    Introduce AdaWacana token with DAO governance
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50">
                  <h3 className="text-xl font-semibold text-purple-400">
                    Phase 5 - Ecosystem Growth
                  </h3>
                  <p className="text-gray-300">
                    Multi-chain support and international expansion
                  </p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-400">
                8. Conclusion
              </h2>
              <p className="text-gray-300 leading-relaxed">
                AdaWacana is set to redefine personal accountability and
                charitable giving in the digital age. Through its blend of
                innovative technology and socially oriented design, the platform
                promises to transform every missed commitment into an
                opportunity for positive change.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

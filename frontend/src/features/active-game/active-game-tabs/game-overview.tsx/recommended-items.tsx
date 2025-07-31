import React, { useState } from "react";
import { Card, Tooltip, Avatar, Skeleton, Typography, Modal } from "antd";
import {
  InfoCircleOutlined,
  ExpandAltOutlined,
  ShoppingCartOutlined,
  TrophyOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { getItemIconSrcById } from "../../../../libs/league/league-utils";

const { Title, Text } = Typography;

interface ItemBuild {
  finalBuild: { itemId: string; itemName: string }[];
  buildSequence: { itemId: string; itemName: string; step: number }[];
}

interface RecommendedItemsProps {
  loadingItems: boolean;
  recommendedItems: ItemBuild | { itemId: string; itemName: string }[];
}

export const RecommendedItems: React.FC<RecommendedItemsProps> = ({
  loadingItems,
  recommendedItems,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if recommendedItems is the new ItemBuild structure or legacy array
  const isItemBuild = (
    items: ItemBuild | { itemId: string; itemName: string }[]
  ): items is ItemBuild => {
    return (
      typeof items === "object" &&
      "finalBuild" in items &&
      "buildSequence" in items
    );
  };

  const finalItems = isItemBuild(recommendedItems)
    ? recommendedItems.finalBuild
    : recommendedItems;

  const buildSequence = isItemBuild(recommendedItems)
    ? recommendedItems.buildSequence
    : [];

  const hasBuildSequence = buildSequence.length > 0;

  const openModal = () => {
    if (hasBuildSequence) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderFinalItems = () => (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 justify-items-center">
      {finalItems.map(({ itemId, itemName }, index) => (
        <Tooltip key={index} title={itemName} placement="top">
          <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-xl border border-gray-600 group-hover:border-blue-400 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/25">
              <Avatar
                src={getItemIconSrcById(itemId)}
                alt={`Item ${itemName}`}
                size={40}
                shape="square"
                className="rounded-lg"
              />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );

  const renderBuildSequenceModal = () => {
    if (!hasBuildSequence) return null;

    // Group items by step
    const stepGroups = buildSequence.reduce((acc, item) => {
      if (!acc[item.step]) acc[item.step] = [];
      acc[item.step].push(item);
      return acc;
    }, {} as Record<number, { itemId: string; itemName: string }[]>);

    return (
      <Modal
        title={
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-2 rounded-lg mr-3">
              <ShoppingCartOutlined className="text-white" />
            </div>
            <Title level={3} className="text-white mb-0 font-bold">
              Detailed Build Order
            </Title>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={800}
        centered
        closeIcon={<CloseOutlined className="text-white text-lg" />}
        styles={{
          mask: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          content: {
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "16px",
          },
          header: {
            backgroundColor: "#1f2937",
            borderBottom: "1px solid #374151",
            borderRadius: "16px 16px 0 0",
          },
          body: {
            backgroundColor: "#1f2937",
            maxHeight: "70vh",
            overflowY: "auto",
          },
        }}
      >
        <div className="space-y-4">
          {/* Final Build Section */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-lg shadow-lg">
                <TrophyOutlined className="text-white" />
                <Text className="text-sm font-bold text-white ml-2 uppercase tracking-wider">
                  Final Build
                </Text>
              </div>
              <div className="flex-1 ml-4 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 justify-items-center">
              {finalItems.map(({ itemId, itemName }, index) => (
                <Tooltip key={index} title={itemName} placement="top">
                  <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
                    <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-2 rounded-xl border border-gray-600 group-hover:border-blue-400 transition-all duration-300 shadow-lg">
                      <Avatar
                        src={getItemIconSrcById(itemId)}
                        alt={`Item ${itemName}`}
                        size={64}
                        shape="square"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Build Sequence Section */}
          <div className="border-t border-gray-700 pt-6">
            <div className="flex items-center mb-6">
              <div className="flex items-center bg-gradient-to-r from-green-600 to-teal-600 px-3 py-2 rounded-lg shadow-lg">
                <ShoppingCartOutlined className="text-white" />
                <Text className="text-sm font-bold text-white ml-2 uppercase tracking-wider">
                  Step by Step Guide
                </Text>
              </div>
              <div className="flex-1 ml-4 h-px bg-gradient-to-r from-green-500/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
              {Object.entries(stepGroups)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([step, items]) => (
                  <div
                    key={step}
                    className="bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg">
                        Step {step}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-start">
                      {items.map(({ itemId, itemName }, index) => (
                        <Tooltip key={index} title={itemName} placement="top">
                          <div className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105">
                            <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 p-1 rounded-lg border border-gray-600 group-hover:border-yellow-400 transition-all duration-300 shadow-md">
                              <Avatar
                                src={getItemIconSrcById(itemId)}
                                alt={`Item ${itemName}`}
                                size={48}
                                shape="square"
                                className="rounded-md"
                              />
                            </div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <>
      <Card
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden w-full"
        styles={{
          body: {
            padding: "16px",
            background: "transparent",
          },
        }}
        size="small"
      >
        <div className="flex items-center justify-between group p-3 rounded-lg transition-all duration-300">
          <div className="flex items-center flex-1 min-w-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3 flex-shrink-0">
              <TrophyOutlined className="text-white text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <Title
                level={5}
                className="text-white mb-0 font-bold"
                ellipsis={{ tooltip: "Recommended Items" }}
              >
                Recommended Items
              </Title>
              <Text
                className="text-gray-400 text-xs block"
                ellipsis={{
                  tooltip: "AI-optimized build for maximum performance",
                }}
              >
                AI-optimized build
              </Text>
            </div>
            <Tooltip title="AI-recommended items for this match.">
              <InfoCircleOutlined className="text-blue-400 text-lg ml-2 hover:text-blue-300 transition-colors flex-shrink-0" />
            </Tooltip>
          </div>
          {hasBuildSequence && (
            <div
              className="flex items-center bg-gray-800 px-2 py-2 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors duration-300 cursor-pointer ml-2 flex-shrink-0"
              onClick={openModal}
            >
              <Text className="text-gray-300 text-xs mr-1 hidden sm:inline">
                Build
              </Text>
              <div className="text-blue-400 transform transition-transform duration-300 hover:scale-110">
                <ExpandAltOutlined />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          {loadingItems ? (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="bg-gray-800 p-2 rounded-xl animate-pulse justify-self-center"
                >
                  <Skeleton.Avatar
                    active
                    style={{ width: 40, height: 40 }}
                    shape="square"
                  />
                </div>
              ))}
            </div>
          ) : (
            renderFinalItems()
          )}
        </div>
      </Card>

      {renderBuildSequenceModal()}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
};

<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use AppBundle\Entity\Building;

/**
 * @Route("/building")
 */
class BuildingController extends JsonController
{
    /**
     * @Route("/list")
     * @Method("GET")
     */
    public function listBuildingsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $context = SerializationContext::create()->setGroups(array('buildingList'));

        try {
            $buildings = $this->getDoctrine()->getRepository('AppBundle:Building')->findAll();
            $buildings = json_decode(SerializerBuilder::create()->build()->serialize($buildings, 'json', $context));

        } catch (Exception $e){
            return $this->JsonFail($e);
        }
        return $this->JsonData($buildings);
    }

    /**
     * @Route("/{id}")
     * @Method("get")
     */
    public function getBuildingAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $requestData = json_decode($request->getContent(), true);
        $context = SerializationContext::create()->setGroups(array('buildingList'));
        
        try{
            $building = $this->getDoctrine()->getRepository('AppBundle:Building')->find($id);

            $building = json_decode(SerializerBuilder::create()->build()->serialize($building, 'json', $context));
        } catch (Exception $e){
            return $this->JsonFail($e);
        }
        return $this->JsonData($building);
    }
}